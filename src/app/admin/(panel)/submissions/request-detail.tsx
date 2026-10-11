"use client";

import { useTransition } from "react";
import { deleteSubmission, setSubmissionStatus } from "../../actions/submissions";
import { Switch } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { useOptimisticFlags } from "../../_components/use-optimistic-flags";
import { MailIcon } from "../../_components/icons";
import { btn } from "../../_components/ui";

export type RequestItem = {
  id: number;
  name: string;
  email: string;
  region: string;
  ticket: string;
  message: string;
  shortlist: string;
  status: "new" | "handled";
  createdAt: string;
  handledAt: string | null;
};

function form(entries: Record<string, string | number>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, String(v));
  return fd;
}

/**
 * Handled or new, flipped in one click with an optimistic switch. Shared by
 * the inbox rows and the request's own view.
 */
export function useHandledToggle(rows: RequestItem[]) {
  const { toast } = useFeedback();
  const [, startTransition] = useTransition();
  const handled = useOptimisticFlags(rows.map((r) => ({ id: r.id, on: r.status === "handled" })));

  const isHandled = (r: RequestItem) => handled.get(r.id);
  const setHandled = (r: RequestItem, next: boolean) => {
    handled.set(r.id, next);
    startTransition(async () => {
      const result = await setSubmissionStatus(form({ id: r.id, status: next ? "handled" : "new" }));
      if (!result.ok) handled.set(r.id, !next);
      toast(result.ok ? `${r.name}: ${next ? "marked as handled" : "marked as new"}.` : result.message ?? "That change could not be saved.", {
        tone: result.ok ? "success" : "error",
      });
    });
  };
  return { isHandled, setHandled };
}

/** Asks, deletes, reports. Resolves true once the request is gone. */
export function useDeleteRequest() {
  const { toast, confirm } = useFeedback();
  return async (r: RequestItem) => {
    const ok = await confirm({
      title: `Delete the request from ${r.name}?`,
      body: "It is removed from the inbox and from future exports. This cannot be undone.",
      confirmLabel: "Delete request",
    });
    if (!ok) return false;
    const result = await deleteSubmission(form({ id: r.id }));
    toast(result.message ?? (result.ok ? "Deleted." : "That request could not be deleted."), { tone: result.ok ? "success" : "error" });
    return result.ok;
  };
}

/** The request itself: who, what they are after, their message, and the two things you do with it. */
export function RequestDetail({ request: r, handled, onHandled }: { request: RequestItem; handled: boolean; onHandled: (next: boolean) => void }) {
  const rows: [string, string][] = [
    ["Region", r.region],
    ["Ticket size", r.ticket],
    ["Shortlist", r.shortlist || "None"],
    ["Received", r.createdAt],
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink/10 bg-shell px-4 py-3">
        <label className="flex items-center gap-3 text-[14px]">
          <Switch checked={handled} onChange={onHandled} label="Handled" />
          <span className="font-medium">{handled ? "Handled" : "Not handled yet"}</span>
        </label>
        <a href={`mailto:${r.email}?subject=${encodeURIComponent("Your KNEKS investor access request")}`} className={btn("primary", "sm")}>
          <MailIcon className="size-4" />
          Reply by email
        </a>
      </div>
      <dl className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-[14px]">
        <dt className="text-ink-muted">Email</dt>
        <dd className="break-words">
          <a href={`mailto:${r.email}`} className="font-medium text-indigo-brand hover:underline">
            {r.email}
          </a>
        </dd>
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className="text-[13px] font-semibold text-ink">Message</p>
        <p className="mt-1.5 whitespace-pre-wrap break-words rounded-lg bg-shell px-4 py-3 text-[14px] leading-relaxed">{r.message || "No message."}</p>
      </div>
    </div>
  );
}
