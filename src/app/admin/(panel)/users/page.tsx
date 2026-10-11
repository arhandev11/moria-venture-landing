import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { removeAdmin } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { Badge, Card, formatDate, PageHeader } from "../../_components/ui";
import { AddAdminForm } from "./add-admin-form";

export const metadata: Metadata = { title: "Admins" };

export default async function UsersPage() {
  const me = await requireAdmin();
  const users = await getDb()
    .select({ id: adminUsers.id, name: adminUsers.name, email: adminUsers.email, createdAt: adminUsers.createdAt, lastLoginAt: adminUsers.lastLoginAt })
    .from(adminUsers)
    .orderBy(asc(adminUsers.createdAt), asc(adminUsers.id));

  return (
    <div className="space-y-6">
      <PageHeader title="Admins" description="Everyone here can manage every part of the admin, including other admins." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="border-b border-rule bg-cream text-[11px] uppercase tracking-[0.08em] text-ink-muted">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Admin</th>
                <th className="px-4 py-2.5 font-semibold">Last sign-in</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">
                      {u.name} {u.id === me.id ? <Badge tone="indigo">You</Badge> : null}
                    </p>
                    <p className="text-[12px] text-ink-muted">{u.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-muted">{u.lastLoginAt ? formatDate(u.lastLoginAt) : "Never"}</td>
                  <td className="px-4 py-3 text-right">
                    {u.id !== me.id && users.length > 1 ? (
                      <form action={removeAdmin}>
                        <input type="hidden" name="id" value={u.id} />
                        <SubmitButton tone="danger" className="h-7 px-2.5 text-[12px]" confirm={`Remove ${u.email}? They will be signed out at once.`}>
                          Remove
                        </SubmitButton>
                      </form>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="self-start p-5">
          <h2 className="text-[15px] font-bold">Add an admin</h2>
          <AddAdminForm />
        </Card>
      </div>
    </div>
  );
}
