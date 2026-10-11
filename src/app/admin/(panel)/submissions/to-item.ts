import "server-only";
import type { InvestorRequestRow } from "@/db/schema";
import { formatDate } from "../../_components/ui";
import type { RequestItem } from "./request-detail";

/** A row as the inbox shows it, dates already formatted in Jakarta time. */
export function toItem(r: InvestorRequestRow): RequestItem {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    region: r.region,
    ticket: r.ticket,
    message: r.message,
    shortlist: r.shortlist,
    status: r.status,
    createdAt: formatDate(r.createdAt),
    handledAt: r.handledAt ? formatDate(r.handledAt) : null,
  };
}
