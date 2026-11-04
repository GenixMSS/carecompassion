import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";
import { escapeHtml, sendNotificationEmail } from "@/utils/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const referenceId = "GNX-" + Math.floor(100000 + Math.random() * 900000);

    const { isConfigured } = getSupabaseEnv();
    if (isConfigured) {
      const supabase = await createClient();
      await supabase.from("quotes").insert({
        reference_id: referenceId,
        name: body.name || "Unknown",
        phone: body.phone || "",
        email: body.email || null,
        overall_service: body.overallService || null,
        specific_service: body.specificService || null,
        visit_date: body.visitDate || null,
        time_slot: body.timeSlot || null,
        message: body.message || null,
      });
    }

    const emailResult = await sendNotificationEmail({
      subject: `[Genix Quote ${referenceId}] New Consultation Request from ${body.name || "Prospective Client"}`,
      replyTo: body.email || undefined,
      text: [
        `New Consultation Quote Request (${referenceId})`,
        `--------------------------------------------------`,
        `Name: ${body.name || "N/A"}`,
        `Phone: ${body.phone || "N/A"}`,
        `Email: ${body.email || "N/A"}`,
        `Service Category: ${body.overallService || "N/A"}`,
        `Specific Service: ${body.specificService || "N/A"}`,
        `Preferred Visit Date: ${body.visitDate || "N/A"}`,
        `Preferred Time Slot: ${body.timeSlot || "N/A"}`,
        `Message / Care Notes: ${body.message || "None provided"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #1c244b; color: #ffffff; padding: 20px 24px;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #fbbf24; font-weight: bold;">Genix Medical Staffing Services</p>
            <h2 style="margin: 6px 0 0; font-size: 20px;">New Consultation Quote Request (${escapeHtml(referenceId)})</h2>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 170px; color: #475569;">Reference ID:</td><td style="padding: 8px 0;">${escapeHtml(referenceId)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Client Name:</td><td style="padding: 8px 0;">${escapeHtml(body.name || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(body.phone || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px 0;">${escapeHtml(body.email || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Service Category:</td><td style="padding: 8px 0;">${escapeHtml(body.overallService || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Specific Service:</td><td style="padding: 8px 0;">${escapeHtml(body.specificService || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Date:</td><td style="padding: 8px 0;">${escapeHtml(body.visitDate || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Time Slot:</td><td style="padding: 8px 0;">${escapeHtml(body.timeSlot || "N/A")}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <strong style="display: block; margin-bottom: 6px; color: #1c244b;">Care Notes / Message:</strong>
              <div>${escapeHtml(body.message || "None provided")}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      referenceId,
      emailSent: emailResult.sent,
      receivedAt: new Date().toISOString(),
      data: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
