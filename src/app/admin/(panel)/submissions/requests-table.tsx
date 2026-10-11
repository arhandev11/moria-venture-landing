"use client";

import Link from "next/link";
import { useState } from "react";
import { OverflowMenu, SearchInput, Switch } from "../../_components/controls";
import { DownloadIcon, InboxIcon } from "../../_components/icons";
import { Modal, ModalBody, ModalFooter } from "../../_components/modal";
import { Badge, btn, Card, EmptyState, PageHeader, TABLE } from "../../_components/ui";
import { RequestDetail, useDeleteRequest, useHandledToggle, type RequestItem } from "./request-detail";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "handled", label: "Handled" },
] as const;

/**
 * The inbox. A row opens the request in a dialog; the switch marks it
 * handled without opening it; delete sits behind the row's menu.
 */
export function RequestsTable({
  rows,
  status,
  counts,
  page,
  pages,
}: {
  rows: RequestItem[];
  status: "all" | "new" | "handled";
  counts: Record<"all" | "new" | "handled", number>;
  page: number;
  pages: number;
}) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const { isHandled, setHandled } = useHandledToggle(rows);
  const remove = useDeleteRequest();

  const q = query.trim().toLowerCase();
  const shown = rows.filter((r) => !q || [r.name, r.email, r.region, r.ticket, r.shortlist].some((f) => f.toLowerCase().includes(q)));
  const open = rows.find((r) => r.id === openId) ?? null;
  const href = (next: { status?: string; page?: number }) => {
    const p = new URLSearchParams();
    const s = next.status ?? status;
    if (s !== "all") p.set("status", s);
    if ((next.page ?? 1) > 1) p.set("page", String(next.page));
    return `/admin/submissions${p.size ? `?${p}` : ""}`;
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Investor requests"
        description="Sent from “Request investor access” on the KNEKS page, newest first."
        actions={
          <a href={`/admin/submissions/export${status === "all" ? "" : `?status=${status}`}`} className={btn("secondary")}>
            <DownloadIcon className="size-4" />
            Export CSV
          </a>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3">
          <nav aria-label="Filter requests" className="flex rounded-md bg-ink/[0.05] p-0.5">
            {FILTERS.map((f) => (
              <Link
                key={f.key}
                href={href({ status: f.key, page: 1 })}
                aria-current={status === f.key ? "page" : undefined}
                className={`flex h-8 items-center gap-1.5 rounded px-3 text-[13px] font-medium ${
                  status === f.key ? "bg-white text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                } focus-visible:outline-2 focus-visible:outline-indigo-brand`}
              >
                {f.label}
                <span className="text-[12px] tabular-nums text-ink/45">{counts[f.key]}</span>
              </Link>
            ))}
          </nav>
          <SearchInput value={query} onChange={setQuery} placeholder="Search this page" />
        </div>

        {rows.length ? (
          <div className={TABLE.scroll}>
            <table className={TABLE.table}>
              <thead>
                <tr>
                  <th className={TABLE.th}>From</th>
                  <th className={`${TABLE.th} max-md:hidden`}>Region</th>
                  <th className={`${TABLE.th} max-md:hidden`}>Ticket size</th>
                  <th className={`${TABLE.th} max-xl:hidden`}>Shortlist</th>
                  <th className={`${TABLE.th} max-xl:hidden`}>Received</th>
                  <th className={TABLE.th}>Handled</th>
                  <th className={`${TABLE.th} w-12`}>
                    <span className="sr-only">More</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => {
                  const handled = isHandled(r);
                  return (
                    <tr key={r.id} onClick={() => setOpenId(r.id)} className={`${TABLE.tr} cursor-pointer ${handled ? "" : "bg-gold/[0.07]"}`}>
                      <td className={TABLE.td}>
                        <div className="flex items-center gap-2">
                          {handled ? null : <Badge tone="gold">New</Badge>}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenId(r.id);
                            }}
                            className={`max-w-[150px] truncate rounded sm:max-w-[200px] text-left hover:text-indigo-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-brand ${handled ? "font-medium text-ink" : "font-semibold text-ink"}`}
                          >
                            {r.name}
                          </button>
                        </div>
                        <p className="max-w-[200px] truncate text-[12px] text-ink-muted sm:max-w-[260px]">{r.email}</p>
                        <p className="max-w-[200px] truncate text-[12px] text-ink-muted md:hidden">
                          {r.region}, {r.ticket}
                        </p>
                        <p className="text-[12px] text-ink-muted xl:hidden">{r.createdAt}</p>
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap max-md:hidden`}>{r.region}</td>
                      <td className={`${TABLE.td} whitespace-nowrap max-md:hidden`}>{r.ticket}</td>
                      <td className={`${TABLE.td} max-w-[200px] truncate text-[13px] text-ink-muted max-xl:hidden`} title={r.shortlist}>
                        {r.shortlist || "None"}
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap text-[13px] text-ink-muted max-xl:hidden`}>{r.createdAt}</td>
                      <td className={TABLE.td}>
                        <Switch checked={handled} onChange={(next) => setHandled(r, next)} label={`${r.name}: handled`} />
                      </td>
                      <td className={`${TABLE.td} text-right`} onClick={(e) => e.stopPropagation()}>
                        <OverflowMenu label={`More for ${r.name}`} items={[{ label: "Delete request", danger: true, onSelect: () => void remove(r) }]} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {shown.length === 0 ? <p className="px-5 py-8 text-center text-[13px] text-ink-muted">No requests on this page match “{query}”.</p> : null}
          </div>
        ) : (
          <EmptyState
            icon={<InboxIcon />}
            title={status === "new" ? "Nothing new" : status === "handled" ? "Nothing handled yet" : "No requests yet"}
            action={
              status === "all" ? (
                <a href="/kneks#request-access" target="_blank" rel="noopener" className={btn("secondary")}>
                  See the form on the KNEKS page
                </a>
              ) : (
                <Link href={href({ status: "all", page: 1 })} className={btn("secondary")}>
                  Show all requests
                </Link>
              )
            }
          >
            {status === "new" ? "Every request has been handled." : "Requests from the KNEKS page land here as soon as they are sent."}
          </EmptyState>
        )}
      </Card>

      {pages > 1 ? (
        <div className="flex items-center justify-end gap-2 text-[13px]">
          <span className="mr-2 text-ink-muted">
            Page {page} of {pages}
          </span>
          {page > 1 ? <Link href={href({ page: page - 1 })} className={btn("secondary", "sm")}>Newer</Link> : null}
          {page < pages ? <Link href={href({ page: page + 1 })} className={btn("secondary", "sm")}>Older</Link> : null}
        </div>
      ) : null}

      <Modal open={!!open} onRequestClose={() => setOpenId(null)} title={open ? open.name : ""} description={open?.email}>
        {open ? (
          <>
            <ModalBody>
              <RequestDetail request={open} handled={isHandled(open)} onHandled={(next) => setHandled(open, next)} />
            </ModalBody>
            <ModalFooter
              start={
                <button
                  type="button"
                  onClick={async () => {
                    if (await remove(open)) setOpenId(null);
                  }}
                  className={btn("danger", "sm")}
                >
                  Delete request
                </button>
              }
            >
              <button type="button" onClick={() => setOpenId(null)} className={btn("secondary")}>
                Close
              </button>
            </ModalFooter>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
