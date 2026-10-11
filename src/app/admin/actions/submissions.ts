"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { investorRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { id, text } from "../_lib/form";
import type { ActionResult } from "../_lib/state";

export async function setSubmissionStatus(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const requestId = id(fd);
  const status = text(fd, "status") === "handled" ? "handled" : "new";
  if (!requestId) return { ok: false, message: "Unknown request." };
  await getDb()
    .update(investorRequests)
    .set({ status, handledAt: status === "handled" ? new Date() : null })
    .where(eq(investorRequests.id, requestId));
  revalidatePath("/admin", "layout");
  return { ok: true, message: status === "handled" ? "Marked as handled." : "Marked as new." };
}

export async function deleteSubmission(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const requestId = id(fd);
  if (!requestId) return { ok: false, message: "Unknown request." };
  await getDb().delete(investorRequests).where(eq(investorRequests.id, requestId));
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Request deleted." };
}
