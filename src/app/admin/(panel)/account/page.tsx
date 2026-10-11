import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/dal";
import { AccountPanel } from "./account-panel";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const me = await requireAdmin();
  return <AccountPanel name={me.name} email={me.email} />;
}
