import net from "node:net";
import tls from "node:tls";

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  isConfigured: boolean;
}

export function getSmtpConfig(): SmtpConfig {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || "465");
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const from = (process.env.MAIL_FROM || user).trim();
  const to = (process.env.MAIL_TO || user).trim();

  const isPlaceholder =
    !pass ||
    pass === "your_smtp_password_here" ||
    host === "your_smtp_host_here";

  return {
    host,
    port: Number.isNaN(port) ? 465 : port,
    user,
    pass,
    from,
    to,
    isConfigured: Boolean(host && port && user && pass && from && to && !isPlaceholder),
  };
}

export interface EmailPayload {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

function extractAddress(address: string): string {
  const match = address.match(/<([^>]+)>/);
  return (match ? match[1] : address).trim();
}

function sendSmtpCommand(
  socket: net.Socket | tls.TLSSocket,
  command?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\r\n").filter(Boolean);
      const lastLine = lines[lines.length - 1] || "";
      // SMTP final response line has a space at index 3 (e.g., "250 OK")
      if (/^\d{3} /.test(lastLine)) {
        cleanup();
        const code = Number(lastLine.slice(0, 3));
        if (code >= 400) {
          reject(new Error(`SMTP Error (${code}): ${buffer.trim()}`));
        } else {
          resolve(buffer);
        }
      }
    };

    const onError = (err: Error) => {
      cleanup();
      reject(err);
    };

    const onTimeout = () => {
      cleanup();
      reject(new Error("SMTP connection timed out"));
    };

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("timeout", onTimeout);
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("timeout", onTimeout);

    if (command !== undefined) {
      socket.write(`${command}\r\n`);
    }
  });
}

function upgradeToTls(socket: net.Socket, host: string): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const tlsSocket = tls.connect(
      {
        socket,
        servername: host,
      },
      () => resolve(tlsSocket)
    );
    tlsSocket.once("error", reject);
  });
}

export async function sendNotificationEmail(
  payload: EmailPayload
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const config = getSmtpConfig();

  if (!config.isConfigured) {
    return { sent: false, skipped: true };
  }

  let socket: net.Socket | tls.TLSSocket | null = null;

  try {
    const implicitTls = config.port === 465;

    socket = await new Promise<net.Socket | tls.TLSSocket>((resolve, reject) => {
      const conn = implicitTls
        ? tls.connect({
            host: config.host,
            port: config.port,
            servername: config.host,
          })
        : net.createConnection({
            host: config.host,
            port: config.port,
          });

      conn.setTimeout(12000);
      conn.once(implicitTls ? "secureConnect" : "connect", () => resolve(conn));
      conn.once("error", reject);
      conn.once("timeout", () => reject(new Error("SMTP connect timeout")));
    });

    // Wait for server 220 greeting
    await sendSmtpCommand(socket);
    const ehloResponse = await sendSmtpCommand(socket, `EHLO ${config.host}`);

    // Upgrade to TLS if connecting on port 587 / STARTTLS
    if (!implicitTls && /STARTTLS/i.test(ehloResponse)) {
      await sendSmtpCommand(socket, "STARTTLS");
      socket = await upgradeToTls(socket, config.host);
      socket.setTimeout(12000);
      await sendSmtpCommand(socket, `EHLO ${config.host}`);
    }

    // Authenticate with AUTH LOGIN
    await sendSmtpCommand(socket, "AUTH LOGIN");
    await sendSmtpCommand(
      socket,
      Buffer.from(config.user, "utf8").toString("base64")
    );
    await sendSmtpCommand(
      socket,
      Buffer.from(config.pass, "utf8").toString("base64")
    );

    const fromEnvelope = extractAddress(config.from);
    const recipients = config.to
      .split(",")
      .map((addr) => extractAddress(addr))
      .filter(Boolean);

    await sendSmtpCommand(socket, `MAIL FROM:<${fromEnvelope}>`);
    for (const rcpt of recipients) {
      await sendSmtpCommand(socket, `RCPT TO:<${rcpt}>`);
    }

    await sendSmtpCommand(socket, "DATA");

    const boundary = `genix_boundary_${Date.now()}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(payload.subject, "utf8").toString("base64")}?=`;
    const headers = [
      `From: "Genix Medical Staffing" <${fromEnvelope}>`,
      `To: ${recipients.map((r) => `<${r}>`).join(", ")}`,
      ...(payload.replyTo ? [`Reply-To: <${extractAddress(payload.replyTo)}>`] : []),
      `Subject: ${encodedSubject}`,
      `Date: ${new Date().toUTCString()}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ];

    const mimeBody = [
      ...headers,
      "",
      `--${boundary}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      `Content-Transfer-Encoding: 8bit`,
      "",
      payload.text,
      "",
      `--${boundary}`,
      `Content-Type: text/html; charset="UTF-8"`,
      `Content-Transfer-Encoding: 8bit`,
      "",
      payload.html,
      "",
      `--${boundary}--`,
      "",
    ]
      .join("\r\n")
      // Dot-stuffing per RFC 5321
      .replace(/\r\n\./g, "\r\n..");

    await sendSmtpCommand(socket, `${mimeBody}\r\n.`);
    await sendSmtpCommand(socket, "QUIT").catch(() => {});
    socket.end();

    return { sent: true };
  } catch (err) {
    if (socket && !socket.destroyed) {
      socket.destroy();
    }
    const message = err instanceof Error ? err.message : "Unknown SMTP error";
    console.error("[Genix Mailer] Failed to send notification email:", message);
    return { sent: false, error: message };
  }
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

