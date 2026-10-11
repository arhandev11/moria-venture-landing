"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../../_components/icons";
import { btn, Card, PageHeader } from "../../_components/ui";
import { RequestDetail, useDeleteRequest, useHandledToggle, type RequestItem } from "./request-detail";

/** A request on its own page, for direct links. The inbox opens the same view in a dialog. */
export function RequestPage({ request }: { request: RequestItem }) {
  const router = useRouter();
  const { isHandled, setHandled } = useHandledToggle([request]);
  const remove = useDeleteRequest();

  return (
    <div className="max-w-[760px] space-y-5">
      <Link href="/admin/submissions" className={btn("ghost", "sm")}>
        <ArrowLeftIcon className="size-4" />
        All requests
      </Link>
      <PageHeader
        title={request.name}
        description={request.email}
        actions={
          <button
            type="button"
            onClick={async () => {
              if (await remove(request)) router.push("/admin/submissions");
            }}
            className={btn("danger")}
          >
            Delete request
          </button>
        }
      />
      <Card className="p-5">
        <RequestDetail request={request} handled={isHandled(request)} onHandled={(next) => setHandled(request, next)} />
      </Card>
    </div>
  );
}
