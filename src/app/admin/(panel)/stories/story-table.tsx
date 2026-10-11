"use client";

import { useState, useTransition } from "react";
import { deleteStory, reorderStories, toggleStoryPublished } from "../../actions/stories";
import { LiveRegion, OverflowMenu, SearchInput, Switch } from "../../_components/controls";
import { useFeedback } from "../../_components/feedback";
import { PlusIcon, StoryIcon } from "../../_components/icons";
import { Modal } from "../../_components/modal";
import { SortableHelp, useSortable } from "../../_components/sortable";
import { Badge, btn, Card, EmptyState, PageHeader, TABLE } from "../../_components/ui";
import { useFormDialog } from "../../_components/use-form-dialog";
import { useOptimisticFlags } from "../../_components/use-optimistic-flags";
import { EMPTY_STORY, StoryForm, today, type StoryFormValues } from "./story-form";

export type StoryListItem = StoryFormValues & { id: number; smeHidden: boolean };

function form(entries: Record<string, string | number>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, String(v));
  return fd;
}

/** "11 Oct 2026", from the stored YYYY-MM-DD without a time zone shifting it. */
function shortDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(d);
}

/**
 * The success stories. A click on a row opens it for editing; the switch
 * publishes or hides in one click (with Undo); rows drag into the order the
 * KNEKS page shows; delete waits behind the row's menu and a confirmation.
 */
export function StoryTable({ items, smeNames }: { items: StoryListItem[]; smeNames: string[] }) {
  const { toast, confirm } = useFeedback();
  const dialog = useFormDialog<StoryFormValues>();
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();
  const published = useOptimisticFlags(items.map((s) => ({ id: s.id, on: s.published })));

  const sortable = useSortable({
    items,
    nameOf: (s) => s.title,
    save: (ids) => reorderStories(ids),
    onError: (message) => toast(message, { tone: "error" }),
  });

  const q = query.trim().toLowerCase();
  const shown = sortable.ordered.filter((s) => !q || [s.title, s.slug, s.sme, s.excerpt].some((f) => f.toLowerCase().includes(q)));
  const isPublished = (s: StoryListItem) => published.get(s.id);
  const addNew = () => dialog.open({ ...EMPTY_STORY, publishedAt: today() });

  const setPublish = (story: StoryListItem, next: boolean, undoable = true) => {
    published.set(story.id, next);
    startTransition(async () => {
      const result = await toggleStoryPublished(form({ id: story.id, published: String(next) }));
      if (!result.ok) {
        published.set(story.id, !next);
        toast(result.message ?? "That change could not be saved.", { tone: "error" });
        return;
      }
      toast(next ? `“${story.title}” is live on the KNEKS page.` : `“${story.title}” is hidden from the KNEKS page.`, {
        action: undoable ? { label: "Undo", run: () => setPublish(story, !next, false) } : undefined,
      });
    });
  };

  const remove = async (story: StoryListItem) => {
    const ok = await confirm({
      title: `Delete “${story.title}”?`,
      body: "It disappears from the KNEKS page, its own page stops working and its cover is deleted. This cannot be undone; hiding it keeps it here instead.",
      confirmLabel: "Delete story",
    });
    if (!ok) return;
    const result = await deleteStory(form({ id: story.id }));
    toast(result.message ?? (result.ok ? "Deleted." : "That story could not be deleted."), { tone: result.ok ? "success" : "error" });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Success stories"
        description="The articles under “Success stories” on the KNEKS page, each with its own page. The page shows the first six; drag rows to change their order."
        actions={
          <button type="button" onClick={addNew} className={btn("primary")}>
            <PlusIcon className="size-4" />
            Add story
          </button>
        }
      />

      <Card className="overflow-hidden">
        {items.length ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3">
              <SearchInput value={query} onChange={setQuery} placeholder="Search title, slug or SME" />
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
                    <th className={TABLE.th}>Story</th>
                    <th className={`${TABLE.th} max-lg:hidden`}>Linked SME</th>
                    <th className={`${TABLE.th} max-md:hidden`}>Date</th>
                    <th className={TABLE.th}>Live</th>
                    <th className={`${TABLE.th} w-12`}>
                      <span className="sr-only">More</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((story) => (
                    <tr
                      key={story.id}
                      ref={sortable.rowRef(story.id)}
                      onClick={() => dialog.open(story)}
                      className={`${TABLE.tr} cursor-pointer ${sortable.dragId === story.id ? "relative z-[2] bg-indigo-brand/[0.05] outline outline-1 outline-indigo-brand/30" : ""}`}
                    >
                      <td className={TABLE.td}>{sortable.handle(story, !!q)}</td>
                      <td className={TABLE.td}>
                        <div className="flex items-center gap-3">
                          {story.coverUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element -- a small thumbnail of the cover
                            <img src={story.coverUrl} alt="" className="h-9 w-16 shrink-0 rounded-md object-cover max-sm:hidden" />
                          ) : (
                            <span aria-hidden className="flex h-9 w-16 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(116deg,#156ba5,#1db45f)] text-white/80 max-sm:hidden">
                              <StoryIcon className="size-4" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dialog.open(story);
                                }}
                                className="block max-w-[180px] truncate rounded text-left font-semibold text-ink hover:text-indigo-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-brand sm:max-w-[320px]"
                              >
                                {story.title}
                              </button>
                              {story.isSample ? <Badge tone="gold">Sample</Badge> : null}
                            </div>
                            <p className="max-w-[180px] truncate font-mono text-[12px] text-ink-muted sm:max-w-[320px]">
                              /kneks/stories/{story.slug}
                              <span className="font-sans lg:hidden">{story.sme ? ` · ${story.sme}` : ""}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={`${TABLE.td} text-ink-muted max-lg:hidden`}>
                        {story.sme ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="max-w-[200px] truncate">{story.sme}</span>
                            {story.smeHidden ? <Badge tone="muted">Hidden</Badge> : null}
                          </span>
                        ) : (
                          <span className="text-ink/35">–</span>
                        )}
                      </td>
                      <td className={`${TABLE.td} whitespace-nowrap text-ink-muted tabular-nums max-md:hidden`}>{shortDate(story.publishedAt)}</td>
                      <td className={TABLE.td}>
                        <Switch checked={isPublished(story)} onChange={(next) => setPublish(story, next)} label={`Show “${story.title}” on the KNEKS page`} />
                      </td>
                      <td className={`${TABLE.td} text-right`} onClick={(e) => e.stopPropagation()}>
                        <OverflowMenu
                          label={`More for “${story.title}”`}
                          items={[
                            ...(isPublished(story)
                              ? [{ label: "View on site", onSelect: () => window.open(`/kneks/stories/${story.slug}`, "_blank", "noopener") }]
                              : []),
                            { label: "Delete story", danger: true, onSelect: () => void remove(story) },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shown.length === 0 ? <p className="px-5 py-8 text-center text-[13px] text-ink-muted">No stories match “{query}”.</p> : null}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<StoryIcon />}
            title="No stories yet"
            action={
              <button type="button" onClick={addNew} className={btn("primary")}>
                <PlusIcon className="size-4" />
                Add the first story
              </button>
            }
          >
            Published stories appear as cards on the KNEKS page, between the SMEs and the graduates.
          </EmptyState>
        )}
      </Card>
      <SortableHelp />
      <LiveRegion>{sortable.announcement}</LiveRegion>

      <Modal
        open={dialog.isOpen}
        onRequestClose={dialog.requestClose}
        title={dialog.subject?.id ? "Edit story" : "Add story"}
        size="lg"
      >
        {dialog.subject ? (
          <StoryForm
            key={dialog.subject.id ?? "new"}
            initial={dialog.subject}
            smeNames={smeNames}
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
