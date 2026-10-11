"use client";

import { useActionState, useEffect, useRef } from "react";
import { addAdmin, removeAdmin } from "../../actions/users";
import { SubmitButton } from "../../_components/buttons";
import { OverflowMenu } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { PlusIcon } from "../../_components/icons";
import { Modal, ModalBody, ModalFooter } from "../../_components/modal";
import { Badge, btn, Card, Field, FormMessage, INPUT, PageHeader, TABLE } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";

type User = { id: number; name: string; email: string; lastLogin: string };

export function UsersTable({ users, meId }: { users: User[]; meId: number }) {
  const { toast, confirm } = useFeedback();
  const dialog = useFormDialog<true>();

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
        description="Everyone here can manage every part of the admin, including other admins."
        actions={
          <button type="button" onClick={() => dialog.open(true)} className={btn("primary")}>
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
                <th className={`${TABLE.th} max-sm:hidden`}>Last sign-in</th>
                <th className={`${TABLE.th} w-12`}>
                  <span className="sr-only">More</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={TABLE.tr}>
                  <td className={TABLE.td}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-brand/[0.08] text-[13px] font-bold text-indigo-brand">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-semibold">
                          {u.name}
                          {u.id === meId ? <Badge tone="indigo">You</Badge> : null}
                        </p>
                        <p className="max-w-[220px] truncate text-[12px] text-ink-muted">{u.email}</p>
                        <p className="text-[12px] text-ink-muted sm:hidden">Last sign-in: {u.lastLogin}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`${TABLE.td} text-[13px] text-ink-muted max-sm:hidden`}>{u.lastLogin}</td>
                  <td className={`${TABLE.td} text-right`}>
                    {u.id !== meId && users.length > 1 ? (
                      <OverflowMenu label={`More for ${u.email}`} items={[{ label: "Remove admin", danger: true, onSelect: () => void remove(u) }]} />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={dialog.isOpen} onRequestClose={dialog.requestClose} title="Add admin" description="They can sign in straight away." size="sm">
        {dialog.isOpen ? (
          <AddAdminForm
            onDirty={dialog.markDirty}
            onCancel={dialog.requestClose}
            onSaved={(message) => {
              dialog.close();
              toast(message);
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}

function AddAdminForm({ onSaved, onCancel, onDirty }: { onSaved: (m: string) => void; onCancel: () => void; onDirty: () => void }) {
  const [state, action] = useActionState(addAdmin, null);
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
