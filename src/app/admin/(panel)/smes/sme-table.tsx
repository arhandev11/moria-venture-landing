"use client";

import { useState, useTransition } from "react";
import { formatMoney, toMoney } from "@/lib/money";
import { CURATION_STATUS_LABELS, type CurationStatus } from "@/lib/sme-fields";
import { deleteSme, reorderSmes, toggleSmePublished } from "../../actions/smes";
import { LiveRegion, OverflowMenu, SearchInput, Switch } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { BuildingIcon, PlusIcon } from "../../_components/icons";
import { Modal } from "../../_components/modal";
import { SortableHelp, useSortable } from "../../_components/sortable";
import { Badge, btn, Card, EmptyState, PageHeader, TABLE } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";
import { useOptimisticFlags } from "../../_components/use-optimistic-flags";
import { EMPTY_SME, SmeForm, type SmeFormValues, type SmeSuggestions } from "./sme-form";

export type SmeListItem = SmeFormValues & { id: number };

/** "IDR 15B", "USD 200K", or null when not disclosed. */
function short(amount: string, currency: string) {
  const money = toMoney(amount ? Number(amount) : null, currency);
  return money ? formatMoney(money, "en", "short") : null;
}

function form(entries: Record<string, string | number>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, String(v));
  return fd;
}

/**
 * The SME list. A click on a row opens it for editing; the switch publishes
 * or hides in one click (with Undo); rows drag into the order the KNEKS page
 * shows; delete waits behind the row's menu and a confirmation.
 */
export function SmeTable({
  items,
  suggestions,
  startWithNew,
}: {
  items: SmeListItem[];
  suggestions: SmeSuggestions;
  /** Opened from the overview's "Add SME": start with the add dialog showing. */
  startWithNew: boolean;
}) {
  const { toast, confirm } = useFeedback();
  const dialog = useFormDialog<SmeFormValues>();
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();
  const published = useOptimisticFlags(items.map((sme) => ({ id: sme.id, on: sme.published })));
  const [autoOpened, setAutoOpened] = useState(false);

  if (startWithNew && !autoOpened) {
    setAutoOpened(true);
    dialog.open(EMPTY_SME);
  }

  const sortable = useSortable({
    items,
    nameOf: (sme) => sme.name,
    save: (ids) => reorderSmes(ids),
    onError: (message) => toast(message, { tone: "error" }),
  });

  const q = query.trim().toLowerCase();
  const shown = sortable.ordered.filter((sme) => !q || [sme.name, sme.sector, sme.city, sme.ceoName].some((f) => f.toLowerCase().includes(q)));
  const isPublished = (sme: SmeListItem) => published.get(sme.id);

  const setPublish = (sme: SmeListItem, next: boolean, undoable = true) => {
    published.set(sme.id, next);
    startTransition(async () => {
      const result = await toggleSmePublished(form({ id: sme.id, published: String(next) }));
      if (!result.ok) {
        published.set(sme.id, !next);
        toast(result.message ?? "That change could not be saved.", { tone: "error" });
        return;
      }
      toast(next ? `${sme.name} is live on the KNEKS page.` : `${sme.name} is hidden from the KNEKS page.`, {
        action: undoable ? { label: "Undo", run: () => setPublish(sme, !next, false) } : undefined,
      });
    });
  };

  const remove = async (sme: SmeListItem) => {
    const ok = await confirm({
      title: `Delete ${sme.name}?`,
      body: "It disappears from the KNEKS page and its image is deleted. This cannot be undone; hiding it keeps it here instead.",
      confirmLabel: "Delete SME",
    });
    if (!ok) return;
    const result = await deleteSme(form({ id: sme.id }));
    toast(result.message ?? (result.ok ? "Deleted." : "That SME could not be deleted."), { tone: result.ok ? "success" : "error" });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="SMEs"
        description="The cards under “SMEs in the program” on the KNEKS page. Drag rows to change their order there."
        actions={
          <button type="button" onClick={() => dialog.open(EMPTY_SME)} className={btn("primary")}>
            <PlusIcon className="size-4" />
            Add SME
          </button>
        }
      />

      <Card className="overflow-hidden">
        {items.length ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3">
              <SearchInput value={query} onChange={setQuery} placeholder="Search name, sector, city or CEO" />
              <p className="text-[12px] text-ink-muted">
                {q ? "Clear the search to reorder." : `${items.filter(isPublished).length} of ${items.length} live`}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className={TABLE.table}>
                <thead>
                  <tr>
                    <th className={`${TABLE.th} w-12`}>
                      <span className="sr-only">Order</span>
                    </th>
                    <th className={TABLE.th}>SME</th>
                    <th className={`${TABLE.th} max-xl:hidden`}>Sector</th>
                    <th className={`${TABLE.th} max-xl:hidden`}>City</th>
                    <th className={`${TABLE.th} max-md:hidden`}>Status</th>
                    <th className={`${TABLE.th} text-right max-lg:hidden`}>Ask</th>
                    <th className={`${TABLE.th} text-right max-xl:hidden`}>Interest / raised</th>
                    <th className={TABLE.th}>Live</th>
                    <th className={`${TABLE.th} w-12`}>
                      <span className="sr-only">More</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((sme) => (
                    <tr
                      key={sme.id}
                      ref={sortable.rowRef(sme.id)}
                      onClick={() => dialog.open(sme)}
                      className={`${TABLE.tr} cursor-pointer ${sortable.dragId === sme.id ? "relative z-[2] bg-indigo-brand/[0.05] outline outline-1 outline-indigo-brand/30" : ""}`}
                    >
                      <td className={TABLE.td}>{sortable.handle(sme, !!q)}</td>
                      <td className={TABLE.td}>
                        <div className="flex items-center gap-3">
                          {sme.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element -- a 36px thumbnail of an upload
                            <img src={sme.imageUrl} alt="" className="size-9 shrink-0 rounded-md object-cover max-sm:hidden" />
                          ) : (
                            <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-md bg-indigo-brand/[0.08] max-sm:hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element -- the brand coin stands in until an image is uploaded */}
                              <img src="/assets/brand/logo-coin.svg" alt="" className="size-6" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                dialog.open(sme);
                              }}
                              className="block max-w-[150px] truncate sm:max-w-[220px] rounded text-left font-semibold text-ink hover:text-indigo-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-brand"
                            >
                              {sme.name}
                            </button>
                            <p className="max-w-[150px] truncate text-[12px] text-ink-muted sm:max-w-[260px]">
                              {sme.stage || sme.readiness}
                              <span className="xl:hidden">
                                {sme.stage || sme.readiness ? ", " : ""}
                                {[sme.sector, sme.city].filter(Boolean).join(", ")}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={`${TABLE.td} text-ink-muted max-xl:hidden`}>{sme.sector}</td>
                      <td className={`${TABLE.td} text-ink-muted max-xl:hidden`}>{sme.city || DASH}</td>
                      <td className={`${TABLE.td} max-md:hidden`}>
                        <div className="flex flex-wrap gap-1">
                          {sme.status === "funded" ? <Badge tone="gold">Funded</Badge> : <Badge tone="indigo">In programme</Badge>}
                          {sme.curationStatus ? (
                            <Badge tone={sme.curationStatus === "approved" ? "green" : "muted"}>{CURATION_STATUS_LABELS[sme.curationStatus as CurationStatus]}</Badge>
                          ) : null}
                        </div>
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap text-right tabular-nums max-lg:hidden`}>
                        <AskCell sme={sme} />
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap text-right tabular-nums max-xl:hidden`}>
                        {sme.status === "funded" ? (short(sme.raisedAmount, sme.raisedCurrency) ?? DASH) : sme.interestPct ? `${sme.interestPct}%` : DASH}
                      </td>
                      <td className={TABLE.td}>
                        <Switch checked={isPublished(sme)} onChange={(next) => setPublish(sme, next)} label={`Show ${sme.name} on the KNEKS page`} />
                      </td>
                      <td className={`${TABLE.td} text-right`} onClick={(e) => e.stopPropagation()}>
                        <OverflowMenu label={`More for ${sme.name}`} items={[{ label: "Delete SME", danger: true, onSelect: () => void remove(sme) }]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shown.length === 0 ? <p className="px-5 py-8 text-center text-[13px] text-ink-muted">No SMEs match “{query}”.</p> : null}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<BuildingIcon />}
            title="No SMEs yet"
            action={
              <button type="button" onClick={() => dialog.open(EMPTY_SME)} className={btn("primary")}>
                <PlusIcon className="size-4" />
                Add the first SME
              </button>
            }
          >
            SMEs you add here appear as cards on the KNEKS page.
          </EmptyState>
        )}
      </Card>
      <SortableHelp />
      <LiveRegion>{sortable.announcement}</LiveRegion>

      <Modal
        open={dialog.isOpen}
        onRequestClose={dialog.requestClose}
        title={dialog.subject?.id ? `Edit ${dialog.subject.name}` : "Add SME"}
        size="lg"
      >
        {dialog.subject ? (
          <SmeForm
            key={dialog.subject.id ?? "new"}
            initial={dialog.subject}
            suggestions={suggestions}
            layout="modal"
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

const DASH = <span className="text-ink/35">–</span>;

/** The ask, short, with a marker when its currency was guessed rather than stated. */
function AskCell({ sme }: { sme: SmeListItem }) {
  const ask = short(sme.askAmount, sme.askCurrency);
  if (!ask) return DASH;
  return (
    <span className="inline-flex items-center justify-end gap-1.5">
      {sme.askCurrencyInferred ? (
        <span
          title="Currency unconfirmed: guessed from the figure's size"
          className="inline-flex size-4 items-center justify-center rounded-full bg-gold/30 text-[10px] font-bold text-[#5c4200] ring-1 ring-inset ring-gold/60"
        >
          ?<span className="sr-only">Currency unconfirmed</span>
        </span>
      ) : null}
      {ask}
    </span>
  );
}
