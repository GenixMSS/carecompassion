import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";
import { escapeHtml, sendNotificationEmail } from "@/utils/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = "APP-" + Math.floor(100000 + Math.random() * 900000);

    const { isConfigured } = getSupabaseEnv();
    if (isConfigured) {
      const supabase = await createClient();
      await supabase.from("job_applications").insert({
        application_id: applicationId,
        full_name: body.fullName || "Unknown Applicant",
        email: body.email || "",
        phone: body.phone || "",
        city: body.city || "",
        credential: body.credential || "",
        experience_years: body.experienceYears || "",
        availability: body.availability || null,
        resume_file_name: body.resumeFileName || null,
        resume_file_path: body.resumeFilePath || null,
        summary: body.summary || null,
      });

      if (body.resumeFilePath && body.resumeFileName) {
        await supabase.from("portal_documents").insert({
          uploaded_by: null,
          portal_scope: "careers",
          category: "Clinical Resume / License Packet",
          title: `${body.fullName || "Applicant"} — ${body.credential || "Clinical"} Resume (${applicationId})`,
          file_name: body.resumeFileName,
          file_path: body.resumeFilePath,
          file_size: Number(body.resumeFileSize || 0),
          mime_type: body.resumeMimeType || "application/pdf",
          uploader_email: body.email || null,
          notes: body.summary || null,
        });
      }
    }

    const emailResult = await sendNotificationEmail({
      subject: `[Genix Careers ${applicationId}] New Clinical Application: ${body.fullName || "Applicant"} (${body.credential || "Clinician"})`,
      replyTo: body.email || undefined,
      text: [
        `New Clinical Job Application (${applicationId})`,
        `--------------------------------------------------`,
        `Full Name: ${body.fullName || "N/A"}`,
        `Credential / License: ${body.credential || "N/A"}`,
        `Experience: ${body.experienceYears || "N/A"}`,
        `Preferred Availability: ${body.availability || "N/A"}`,
        `City / County: ${body.city || "N/A"}`,
        `Phone: ${body.phone || "N/A"}`,
        `Email: ${body.email || "N/A"}`,
        `Resume File Attached: ${body.resumeFileName || "None uploaded"}`,
        `Clinical Summary: ${body.summary || "None provided"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #1c244b; color: #ffffff; padding: 20px 24px;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #fbbf24; font-weight: bold;">Genix Clinical Recruitment</p>
            <h2 style="margin: 6px 0 0; font-size: 20px;">New Clinical Application (${escapeHtml(applicationId)})</h2>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 170px; color: #475569;">Application ID:</td><td style="padding: 8px 0;">${escapeHtml(applicationId)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Applicant Name:</td><td style="padding: 8px 0;">${escapeHtml(body.fullName || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Credential:</td><td style="padding: 8px 0; font-weight: bold; color: #d62828;">${escapeHtml(body.credential || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Experience:</td><td style="padding: 8px 0;">${escapeHtml(body.experienceYears || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Availability:</td><td style="padding: 8px 0;">${escapeHtml(body.availability || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">City / Location:</td><td style="padding: 8px 0;">${escapeHtml(body.city || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(body.phone || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px 0;">${escapeHtml(body.email || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Resume File:</td><td style="padding: 8px 0;">${escapeHtml(body.resumeFileName || "None uploaded")}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <strong style="display: block; margin-bottom: 6px; color: #1c244b;">Clinical Experience Summary:</strong>
              <div>${escapeHtml(body.summary || "None provided")}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      applicationId,
      emailSent: emailResult.sent,
      receivedAt: new Date().toISOString(),
      data: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid application submission" },
      { status: 400 }
    );
  }
}
