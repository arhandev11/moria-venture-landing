"use client";

import { useRouter } from "next/navigation";
import { deleteSme } from "../../actions/smes";
import { useFeedback } from "../../_components/feedback";
import { runAction } from "../../_components/run-action";
import { btn, Card, PageHeader } from "../../_components/ui";
import { SmeForm, type SmeFormValues, type SmeSuggestions } from "./sme-form";

/**
 * The SME form on its own page, for direct links (/admin/smes/new and
 * /admin/smes/[id]). The list opens the same form in a dialog.
 */
export function SmePageForm({ initial, suggestions }: { initial: SmeFormValues; suggestions: SmeSuggestions }) {
  const router = useRouter();
  const { toast, confirm } = useFeedback();
  const back = () => router.push("/admin/smes");

  const remove = async () => {
    if (!initial.id) return;
    const ok = await confirm({
      title: `Delete ${initial.name}?`,
      body: "It disappears from the KNEKS page and its image is deleted. This cannot be undone.",
      confirmLabel: "Delete SME",
    });
    if (!ok) return;
    const fd = new FormData();
    fd.set("id", String(initial.id));
    const result = await runAction(() => deleteSme(fd));
    toast(result.message ?? "Deleted.", { tone: result.ok ? "success" : "error" });
    if (result.ok) back();
  };

  return (
    <div className="max-w-[820px] space-y-5">
      <PageHeader
        title={initial.id ? initial.name : "Add SME"}
        actions={
          initial.id ? (
            <button type="button" onClick={remove} className={btn("danger")}>
              Delete SME
            </button>
          ) : null
        }
      />
      <Card className="p-5 sm:p-6">
        <SmeForm
          initial={initial}
          suggestions={suggestions}
          layout="page"
          onCancel={back}
          onSaved={(message) => {
            toast(message);
            back();
          }}
        />
      </Card>
    </div>
  );
}
