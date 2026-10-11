import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "@/db";
import { formOptions, type FormOptionRow, type OptionKind } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/dal";
import { deleteOption, moveOption, toggleOption } from "../../actions/options";
import { SubmitButton } from "../../_components/buttons";
import { Badge, Card, PageHeader } from "../../_components/ui";
import { AddOptionForm, RenameOptionForm } from "./option-forms";

export const metadata: Metadata = { title: "Form options" };

const LISTS: { kind: OptionKind; title: string; hint: string }[] = [
  { kind: "region", title: "Regions", hint: "The “Region” dropdown." },
  { kind: "ticket", title: "Ticket sizes", hint: "The “Ticket size” dropdown." },
];

export default async function OptionsPage() {
  await requireAdmin();
  const rows = await getDb().select().from(formOptions).orderBy(asc(formOptions.sortOrder), asc(formOptions.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Form options"
        description="Choices on the “Request investor access” form on /kneks. Only active options are shown and accepted."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {LISTS.map((list) => (
          <OptionList key={list.kind} {...list} rows={rows.filter((r) => r.kind === list.kind)} />
        ))}
      </div>
    </div>
  );
}

function OptionList({ kind, title, hint, rows }: { kind: OptionKind; title: string; hint: string; rows: FormOptionRow[] }) {
  return (
    <Card>
      <div className="border-b border-rule px-5 py-3">
        <h2 className="text-[15px] font-bold">{title}</h2>
        <p className="text-[12px] text-ink-muted">{hint}</p>
      </div>
      <ul className="divide-y divide-rule">
        {rows.map((row, i) => (
          <li key={row.id} className="flex flex-wrap items-center gap-2 px-5 py-2.5">
            <div className="flex gap-1">
              <form action={moveOption}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="kind" value={kind} />
                <input type="hidden" name="direction" value="up" />
                <SubmitButton tone="icon" aria-label={`Move ${row.label} up`} disabled={i === 0}>↑</SubmitButton>
              </form>
              <form action={moveOption}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="kind" value={kind} />
                <input type="hidden" name="direction" value="down" />
                <SubmitButton tone="icon" aria-label={`Move ${row.label} down`} disabled={i === rows.length - 1}>↓</SubmitButton>
              </form>
            </div>
            <RenameOptionForm id={row.id} label={row.label} />
            <form action={toggleOption} className="flex items-center gap-2">
              <input type="hidden" name="id" value={row.id} />
              <input type="hidden" name="active" value={row.active ? "false" : "true"} />
              {row.active ? <Badge tone="green">Active</Badge> : <Badge tone="grey">Off</Badge>}
              <SubmitButton tone="secondary" className="h-7 px-2.5 text-[12px]">
                {row.active ? "Turn off" : "Turn on"}
              </SubmitButton>
            </form>
            <form action={deleteOption}>
              <input type="hidden" name="id" value={row.id} />
              <SubmitButton tone="danger" className="h-7 px-2.5 text-[12px]" confirm={`Delete “${row.label}”? Past requests keep their value.`}>
                Delete
              </SubmitButton>
            </form>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-5 py-4 text-[14px] text-ink-muted">No options yet.</li> : null}
      </ul>
      <div className="border-t border-rule px-5 py-4">
        <AddOptionForm kind={kind} />
      </div>
    </Card>
  );
}
