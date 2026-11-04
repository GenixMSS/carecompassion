"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const ALLOWED_TABLES = [
  "quotes",
  "staffing_requests",
  "job_applications",
] as const;
type SubmissionTable = (typeof ALLOWED_TABLES)[number];

export async function updateSubmissionStatus(
  table: SubmissionTable,
  id: number,
  status: string
) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new Error("Invalid table name");
  }

  const supabase = await createClient();

  // Strict server-side check with getUser() before performing a mutation
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?next=/admin");
  }

  const { error } = await supabase
    .from(table)
    .update({
      status,
      reviewed_by: user.id,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

