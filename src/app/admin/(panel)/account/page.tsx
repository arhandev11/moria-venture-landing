import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/dal";
import { Card, PageHeader } from "../../_components/ui";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const me = await requireAdmin();
  return (
    <div className="max-w-[520px] space-y-6">
      <PageHeader title="Account" description={`Signed in as ${me.email}.`} />
      <Card className="p-5">
        <h2 className="text-[15px] font-bold">Change password</h2>
        <PasswordForm />
      </Card>
    </div>
  );
}
