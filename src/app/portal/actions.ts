"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";

export async function familyLogin(formData: FormData) {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect(
      "/portal?error=" +
        encodeURIComponent(
          "Supabase environment variables are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local."
        )
    );
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect(
      "/portal?error=" +
        encodeURIComponent("Email and password are required to sign in.")
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/portal?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/portal", "layout");
  redirect("/portal/dashboard");
}

export async function familySignup(formData: FormData) {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect(
      "/portal?mode=register&error=" +
        encodeURIComponent(
          "Supabase environment variables are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local."
        )
    );
  }

  const patientName = String(formData.get("patientName") || "").trim();
  const carePlanCode = String(formData.get("carePlanCode") || "GNX-2026").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect(
      "/portal?mode=register&error=" +
        encodeURIComponent("Email and password are required.")
    );
  }

  if (password.length < 6) {
    redirect(
      "/portal?mode=register&error=" +
        encodeURIComponent("Password must be at least 6 characters long.")
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        patient_name: patientName,
        care_plan_code: carePlanCode,
      },
    },
  });

  if (error) {
    redirect(
      `/portal?mode=register&error=${encodeURIComponent(error.message)}`
    );
  }

  if (data.session && data.user) {
    // Attempt to initialize a care_plans row if the schema migration has been applied
    await supabase.from("care_plans").insert({
      care_plan_code: `${carePlanCode}-${Math.floor(100 + Math.random() * 900)}`,
      family_user_id: data.user.id,
      patient_name: patientName || "Loved One",
    });

    revalidatePath("/portal", "layout");
    redirect("/portal/dashboard");
  }

  redirect(
    "/portal?message=" +
      encodeURIComponent(
        "Family portal account created! Please check your email inbox to confirm your account, then sign in."
      )
  );
}

export async function familySignout() {
  const { isConfigured } = getSupabaseEnv();
  if (isConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/portal", "layout");
  redirect(
    "/portal?message=" +
      encodeURIComponent("You have signed out of the Family Care Portal.")
  );
}

