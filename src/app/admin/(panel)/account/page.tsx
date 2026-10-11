import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/dal";
import { ROLE_LABELS, ROLE_SUMMARIES } from "@/lib/auth/roles";
import { AccountPanel } from "./account-panel";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  // Every role has an account page: their own password and nothing else.
  const me = await requireAdmin();
  return <AccountPanel name={me.name} email={me.email} role={{ label: ROLE_LABELS[me.role], summary: ROLE_SUMMARIES[me.role] }} />;
}
