import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";
import { escapeHtml, sendNotificationEmail } from "@/utils/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestId = "STF-" + Math.floor(100000 + Math.random() * 900000);

    const { isConfigured } = getSupabaseEnv();
    if (isConfigured) {
      const supabase = await createClient();
      await supabase.from("staffing_requests").insert({
        request_id: requestId,
        facility_name: body.facilityName || "Unknown Facility",
        facility_type: body.facilityType || "Hospital / Acute Care",
        contact_name: body.contactName || "",
        phone: body.phone || "",
        email: body.email || "",
        role_needed: body.roleNeeded || "",
        specialty: body.specialty || null,
        shift_type: body.shiftType || null,
        staff_count: body.staffCount || null,
        notes: body.notes || null,
      });
    }

    const emailResult = await sendNotificationEmail({
      subject: `[Genix Staffing ${requestId}] Urgent Request from ${body.facilityName || "Partner Facility"} (${body.roleNeeded || "Clinical Staff"})`,
      replyTo: body.email || undefined,
      text: [
        `New B2B Facility Staffing Request (${requestId})`,
        `--------------------------------------------------`,
        `Facility Name: ${body.facilityName || "N/A"}`,
        `Facility Type: ${body.facilityType || "N/A"}`,
        `Contact Person: ${body.contactName || "N/A"}`,
        `Phone: ${body.phone || "N/A"}`,
        `Email: ${body.email || "N/A"}`,
        `Role Needed: ${body.roleNeeded || "N/A"}`,
        `Unit / Specialty: ${body.specialty || "N/A"}`,
        `Shift Type: ${body.shiftType || "N/A"}`,
        `Staff Count: ${body.staffCount || "N/A"}`,
        `Notes / Requirements: ${body.notes || "None provided"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #1c244b; color: #ffffff; padding: 20px 24px;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #fbbf24; font-weight: bold;">Genix Rapid-Dispatch Desk</p>
            <h2 style="margin: 6px 0 0; font-size: 20px;">Facility Staffing Request (${escapeHtml(requestId)})</h2>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 170px; color: #475569;">Request ID:</td><td style="padding: 8px 0;">${escapeHtml(requestId)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Facility Name:</td><td style="padding: 8px 0;">${escapeHtml(body.facilityName || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Facility Type:</td><td style="padding: 8px 0;">${escapeHtml(body.facilityType || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Name:</td><td style="padding: 8px 0;">${escapeHtml(body.contactName || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(body.phone || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px 0;">${escapeHtml(body.email || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Role Needed:</td><td style="padding: 8px 0; font-weight: bold; color: #d62828;">${escapeHtml(body.roleNeeded || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Unit / Specialty:</td><td style="padding: 8px 0;">${escapeHtml(body.specialty || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Shift Type:</td><td style="padding: 8px 0;">${escapeHtml(body.shiftType || "N/A")}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Staff Count:</td><td style="padding: 8px 0;">${escapeHtml(body.staffCount || "N/A")}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <strong style="display: block; margin-bottom: 6px; color: #1c244b;">Shift Notes &amp; Credentials Needed:</strong>
              <div>${escapeHtml(body.notes || "None provided")}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      requestId,
      emailSent: emailResult.sent,
      receivedAt: new Date().toISOString(),
      data: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid staffing request" },
      { status: 400 }
    );
  }
}
