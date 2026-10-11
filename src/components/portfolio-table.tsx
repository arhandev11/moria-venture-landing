"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

/** Keys into the register's `types` labels, so the filter never compares translated text. */
export type ProjectType = keyof Dictionary["portfolio"]["register"]["types"];

export type Investment = {
  /** Kept as issued: the register skips 7 and 8, and the table shows that. */
  no: number;
  project: string;
  type: ProjectType;
  /** Shown as written; the register keeps its own figures. */
  amount: string;
};

/*
 * The deck labels this "Filter by Sector", but the projects on the register
 * carry a financing type rather than a sector, so the tabs filter on type.
 */
const FILTERS: ("all" | ProjectType)[] = [
  "all",
  "poFinancing",
  "projectFinancing",
  "khadamat",
];

export function PortfolioFilter({
  investments,
  labels,
}: {
  investments: Investment[];
  labels: Dictionary["portfolio"]["register"];
}) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("all");
  const label = (filter: (typeof FILTERS)[number]) =>
    filter === "all" ? labels.all : labels.types[filter];
  const rows =
    active === "all"
      ? investments
      : investments.filter((item) => item.type === active);

  return (
    <>
      <div className="border-b border-hairline bg-cream">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[79px] pt-[80px] md:px-10 lg:px-20">
          <p className="text-[13px] font-bold uppercase leading-[16px] tracking-[0.02em] text-ink">
            {labels.filterLabel}
          </p>
          <div className="mt-[22px] flex flex-wrap gap-x-[25px] gap-y-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
                className={`border-b-2 pb-[8px] text-[12px] font-bold uppercase leading-[14px] tracking-[0.04em] text-indigo-brand transition-colors ${
                  active === filter
                    ? "border-gold"
                    : "border-transparent hover:border-gold/50"
                }`}
              >
                {label(filter)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-shell">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[158px] pt-[159px] md:px-10 lg:px-20">
          <h2 className="t-section text-end text-indigo-brand">
            {labels.title}
          </h2>

          <div className="mt-[100px] overflow-x-auto lg:ms-auto lg:w-[990px]">
            <table className="w-full min-w-[640px] table-fixed text-left rtl:text-right">
              <colgroup>
                <col className="w-[80px]" />
                <col className="w-[400px]" />
                <col className="w-[280px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-indigo-brand text-[12.5px] font-bold uppercase leading-[15px] tracking-[0.02em] text-ink">
                  <th className="pb-[17px] font-bold">{labels.columns.no}</th>
                  <th className="pb-[17px] font-bold">{labels.columns.project}</th>
                  <th className="pb-[17px] font-bold">{labels.columns.type}</th>
                  <th className="pb-[17px] font-bold">{labels.columns.investment}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={item.no} className="h-[78px] border-b border-[#dfe2e5]">
                    <td className="text-[15px] text-ink">{item.no}</td>
                    <td className="text-[21px] font-semibold text-indigo-brand">
                      {item.project}
                    </td>
                    <td className="text-[15px] text-ink">{labels.types[item.type]}</td>
                    <td className="text-[15px] tabular-nums text-ink">
                      {item.amount}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-[13px] text-ink-muted"
                    >
                      {labels.empty}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
