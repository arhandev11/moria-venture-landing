import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireSuperadmin } from "@/lib/auth/dal";
import { formatDate } from "../../_components/ui";
import { UsersTable } from "./users-table";

export const metadata: Metadata = { title: "Admins" };

export default async function UsersPage() {
  const me = await requireSuperadmin();
  const users = await getDb()
    .select({ id: adminUsers.id, name: adminUsers.name, email: adminUsers.email, role: adminUsers.role, lastLoginAt: adminUsers.lastLoginAt })
    .from(adminUsers)
    .orderBy(asc(adminUsers.createdAt), asc(adminUsers.id));

  return (
    <UsersTable
      meId={me.id}
      users={users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, lastLogin: u.lastLoginAt ? formatDate(u.lastLoginAt) : "Never" }))}
    />
  );
}
