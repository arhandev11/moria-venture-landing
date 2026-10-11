"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { ADMIN_ROLES, ROLE_LABELS, ROLE_SUMMARIES, type AdminRole } from "@/lib/auth/roles";
import { addAdmin, removeAdmin, setAdminRole } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { OverflowMenu } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { PlusIcon } from "../../_components/icons";
import { Modal, ModalBody, ModalFooter } from "../../_components/modal";
import { Badge, btn, Card, Field, FormMessage, INPUT, PageHeader, TABLE } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";

type User = { id: number; name: string; email: string; role: AdminRole; lastLogin: string };

export function RolePill({ role }: { role: AdminRole }) {
  return <Badge tone={role === "superadmin" ? "indigo" : "green"}>{ROLE_LABELS[role]}</Badge>;
}

export function UsersTable({ users, meId }: { users: User[]; meId: number }) {
  const { toast, confirm } = useFeedback();
  const adding = useFormDialog<true>();
  const [editing, setEditing] = useState<User | null>(null);
  const superadmins = users.filter((u) => u.role === "superadmin").length;

  const remove = async (u: User) => {
    const ok = await confirm({
      title: `Remove ${u.name}?`,
      body: `${u.email} is signed out at once and can no longer sign in.`,
      confirmLabel: "Remove admin",
    });
    if (!ok) return;
    const fd = new FormData();
    fd.set("id", String(u.id));
    const result = await removeAdmin(fd);
    toast(result.message ?? "Done.", { tone: result.ok ? "success" : "error" });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Admins"
        description="Superadmins manage everything here, including other admins. KNEKS users only manage the SMEs on the KNEKS page: they never see investor requests or receive their emails."
        actions={
          <button type="button" onClick={() => adding.open(true)} className={btn("primary")}>
            <PlusIcon className="size-4" />
            Add admin
          </button>
        }
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className={TABLE.table}>
            <thead>
              <tr>
                <th className={TABLE.th}>Admin</th>
                <th className={`${TABLE.th} max-sm:hidden`}>Role</th>
                <th className={`${TABLE.th} max-md:hidden`}>Last sign-in</th>
                <th className={`${TABLE.th} w-12`}>
                  <span className="sr-only">More</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} data-user={u.email} className={TABLE.tr}>
                  <td className={TABLE.td}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-brand/[0.08] text-[13px] font-bold text-indigo-brand">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-semibold">
                          {u.name}
                          {u.id === meId ? <Badge tone="muted">You</Badge> : null}
                        </p>
                        <p className="max-w-[220px] truncate text-[12px] text-ink-muted">{u.email}</p>
                        <p className="mt-1 sm:hidden">
                          <RolePill role={u.role} />
                        </p>
                        <p className="text-[12px] text-ink-muted md:hidden">Last sign-in: {u.lastLogin}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`${TABLE.td} max-sm:hidden`}>
                    <RolePill role={u.role} />
                  </td>
                  <td className={`${TABLE.td} text-[13px] text-ink-muted max-md:hidden`}>{u.lastLogin}</td>
                  <td className={`${TABLE.td} text-right`}>
                    <OverflowMenu
                      label={`More for ${u.email}`}
                      items={[
                        { label: "Change role", onSelect: () => setEditing(u) },
                        ...(u.id !== meId ? [{ label: "Remove admin", danger: true, onSelect: () => void remove(u) }] : []),
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={adding.isOpen} onRequestClose={adding.requestClose} title="Add admin" description="They can sign in straight away." size="sm">
        {adding.isOpen ? (
          <AddAdminForm
            onDirty={adding.markDirty}
            onCancel={adding.requestClose}
            onSaved={(message) => {
              adding.close();
              toast(message);
            }}
          />
        ) : null}
      </Modal>

      <Modal
        open={!!editing}
        onRequestClose={() => setEditing(null)}
        title={editing ? `Change role for ${editing.name}` : "Change role"}
        description={editing?.email}
        size="sm"
      >
        {editing ? (
          <RoleForm
            key={editing.id}
            user={editing}
            isMe={editing.id === meId}
            lastSuperadmin={editing.role === "superadmin" && superadmins <= 1}
            onCancel={() => setEditing(null)}
            onDone={(message, ok) => {
              if (ok) setEditing(null);
              toast(message, { tone: ok ? "success" : "error" });
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}

/** The two roles as cards with what each may do, for the add and change dialogs. */
function RolePicker({ value, onChange, locked }: { value: AdminRole; onChange: (role: AdminRole) => void; locked?: AdminRole }) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold text-ink">Role</legend>
      <div className="mt-1.5 grid gap-2">
        {ADMIN_ROLES.map((role) => {
          const disabled = !!locked && role !== locked;
          return (
            <label
              key={role}
              className={`flex items-start gap-2.5 rounded-md border px-3 py-2.5 text-[13px] has-focus-visible:ring-3 has-focus-visible:ring-indigo-brand/20 ${
                value === role ? "border-indigo-brand bg-indigo-brand/[0.05]" : "border-ink/15"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="role"
                value={role}
                checked={value === role}
                disabled={disabled}
                onChange={() => onChange(role)}
                className="mt-0.5 accent-indigo-brand"
              />
              <span>
                <span className={`block font-semibold ${value === role ? "text-indigo-brand" : "text-ink"}`}>{ROLE_LABELS[role]}</span>
                <span className="block text-[12px] text-ink-muted">{ROLE_SUMMARIES[role]}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function RoleForm({
  user,
  isMe,
  lastSuperadmin,
  onCancel,
  onDone,
}: {
  user: User;
  isMe: boolean;
  lastSuperadmin: boolean;
  onCancel: () => void;
  onDone: (message: string, ok: boolean) => void;
}) {
  const [role, setRole] = useState<AdminRole>(user.role);
  const [pending, startTransition] = useTransition();
  const changed = role !== user.role;
  const demotingMe = isMe && changed && role !== "superadmin";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!changed) return onCancel();
        const fd = new FormData();
        fd.set("id", String(user.id));
        fd.set("role", role);
        startTransition(async () => {
          // Demoting yourself ends on another page: the action redirects.
          const result = await setAdminRole(fd);
          onDone(result.message ?? (result.ok ? "Role changed." : "That role could not be changed."), result.ok);
        });
      }}
    >
      <ModalBody className="space-y-4">
        <RolePicker value={role} onChange={setRole} locked={lastSuperadmin ? "superadmin" : undefined} />
        {lastSuperadmin ? (
          <p className="text-[12px] text-ink-muted">This is the only superadmin. Make someone else a superadmin before changing this role.</p>
        ) : demotingMe ? (
          <FormMessage>You will lose access to investor requests, form options and this page as soon as you save.</FormMessage>
        ) : changed ? (
          <p className="text-[12px] text-ink-muted">It applies on their next click; they do not need to sign in again.</p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={onCancel} className={btn("secondary")}>
          Cancel
        </button>
        <button type="submit" disabled={!changed || pending} className={btn(demotingMe ? "destructive" : "primary")}>
          {pending ? "Saving…" : "Change role"}
        </button>
      </ModalFooter>
    </form>
  );
}

function AddAdminForm({ onSaved, onCancel, onDirty }: { onSaved: (m: string) => void; onCancel: () => void; onDirty: () => void }) {
  const [state, action] = useActionState(addAdmin, null);
  const [role, setRole] = useState<AdminRole>("kneks");
  const reported = useRef<typeof state>(null);
  useEffect(() => {
    if (state?.ok && reported.current !== state) {
      reported.current = state;
      onSaved(state.message ?? "Added.");
    }
  }, [state, onSaved]);
  const err = (key: string) => (state && !state.ok ? state.fieldErrors?.[key] : undefined);

  return (
    <form action={action} onInput={onDirty}>
      <ModalBody className="space-y-4">
        {state && !state.ok && state.message ? <FormMessage>{state.message}</FormMessage> : null}
        <Field label="Name" error={err("name")}>
          <input name="name" required data-autofocus maxLength={120} defaultValue={state?.values?.name} aria-invalid={!!err("name")} className={INPUT} />
        </Field>
        <Field label="Email" error={err("email")}>
          <input name="email" type="email" required autoComplete="off" defaultValue={state?.values?.email} aria-invalid={!!err("email")} className={INPUT} />
        </Field>
        <Field label="Password" error={err("password")} hint="At least 8 characters. Share it privately; they can change it under Account.">
          <input name="password" type="password" required minLength={8} autoComplete="new-password" aria-invalid={!!err("password")} className={INPUT} />
        </Field>
        <RolePicker value={role} onChange={setRole} />
        {err("role") ? (
          <p role="alert" className="text-[12px] font-medium text-red-700">
            {err("role")}
          </p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={onCancel} className={btn("secondary")}>
          Cancel
        </button>
        <SubmitButton pendingLabel="Adding…">Add admin</SubmitButton>
      </ModalFooter>
    </form>
  );
}
