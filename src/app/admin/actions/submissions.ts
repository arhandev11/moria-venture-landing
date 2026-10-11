"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { id, text } from "../_lib/form";

export async function setSubmissionStatus(fd: FormData) {
  await requireAdmin();
  const requestId = id(fd);
  const status = text(fd, "status") === "handled" ? "handled" : "new";
  if (!requestId) return;
  await getDb()
    .update(investorRequests)
    .set({ status, handledAt: status === "handled" ? new Date() : null })
    .where(eq(investorRequests.id, requestId));
  revalidatePath("/admin", "layout");
}

export async function deleteSubmission(fd: FormData) {
  await requireAdmin();
  const requestId = id(fd);
  if (!requestId) return;
  await getDb().delete(investorRequests).where(eq(investorRequests.id, requestId));
  revalidatePath("/admin", "layout");
  redirect("/admin/submissions");
}
