"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseEnv } from "@/utils/supabase/config";

function sanitizeRedirectPath(nextPath: FormDataEntryValue | null): string {
  if (
    typeof nextPath === "string" &&
    nextPath.startsWith("/") &&
    !nextPath.startsWith("//")
  ) {
    return nextPath;
  }
  return "/admin";
}

export async function login(formData: FormData) {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect(
      "/login?error=" +
        encodeURIComponent(
          "Supabase environment variables are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local."
        )
    );
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const nextPath = sanitizeRedirectPath(formData.get("next"));

  if (!email || !password) {
    redirect(
      `/login?next=${encodeURIComponent(nextPath)}&error=${encodeURIComponent(
        "Email and password are required."
      )}`
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?next=${encodeURIComponent(nextPath)}&error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/", "layout");
  redirect(nextPath);
}

export async function signup(formData: FormData) {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    redirect(
      "/login?mode=signup&error=" +
        encodeURIComponent(
          "Supabase environment variables are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local."
        )
    );
  }

  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const nextPath = sanitizeRedirectPath(formData.get("next"));

  if (!email || !password) {
    redirect(
      `/login?mode=signup&next=${encodeURIComponent(
        nextPath
      )}&error=${encodeURIComponent("Email and password are required.")}`
    );
  }

  if (password.length < 6) {
    redirect(
      `/login?mode=signup&next=${encodeURIComponent(
        nextPath
      )}&error=${encodeURIComponent(
        "Password must be at least 6 characters long."
      )}`
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(
      `/login?mode=signup&next=${encodeURIComponent(
        nextPath
      )}&error=${encodeURIComponent(error.message)}`
    );
  }

  // If email confirmations are disabled in Supabase, session is returned immediately
  if (data.session) {
    revalidatePath("/", "layout");
    redirect(nextPath);
  }

  redirect(
    `/login?next=${encodeURIComponent(nextPath)}&message=${encodeURIComponent(
      "Account created! Please check your email inbox to confirm your account before signing in."
    )}`
  );
}

export async function signout() {
  const { isConfigured } = getSupabaseEnv();
  if (isConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login?message=" + encodeURIComponent("You have been signed out."));
}

