import Link from "next/link";
import { btn, Card, EmptyState } from "../_components/ui";

/**
 * Inside the signed-in frame: a record that does not exist, or a page this
 * role may not open. Both read the same, so the second gives nothing away.
 * /admin sends each role on to its own starting page.
 */
export default function PanelNotFound() {
  return (
    <Card>
      <EmptyState
        icon={<span className="text-[15px] font-bold">404</span>}
        title="This page is not available"
        action={
          <Link href="/admin" className={btn("primary")}>
            Back to the admin
          </Link>
        }
      >
        It may have been deleted, or it is not part of your access.
      </EmptyState>
    </Card>
  );
}
