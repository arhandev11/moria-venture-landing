"use client";

import { useState } from "react";

export type ProjectType = "PO Financing" | "Project Financing" | "Khadamat";

export type Investment = {
  /** Kept as issued: the register skips 7 and 8, and the table shows that. */
  no: number;
  project: string;
  type: ProjectType;
  amount: string;
};

/*
 * The deck labels this "Filter by Sector", but the projects on the register
 * carry a financing type rather than a sector, so the tabs filter on type.
 */
const FILTERS: ("All" | ProjectType)[] = [
  "All",
  "PO Financing",
  "Project Financing",
  "Khadamat",
];

export function PortfolioFilter({
  investments,
}: {
  investments: Investment[];
}) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const rows =
    active === "All"
      ? investments
      : investments.filter((item) => item.type === active);

  return (
    <>
      <div className="border-b border-hairline bg-cream">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[79px] pt-[80px] md:px-10 lg:px-20">
          <p className="text-[13px] font-bold uppercase leading-[16px] tracking-[0.02em] text-ink">
            Filter by Sector
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
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-shell">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[158px] pt-[159px] md:px-10 lg:px-20">
          <h2 className="t-section text-right text-indigo-brand">
            Active Investments
          </h2>

          <div className="mt-[100px] overflow-x-auto lg:ml-auto lg:w-[990px]">
            <table className="w-full min-w-[640px] table-fixed text-left">
              <colgroup>
                <col className="w-[80px]" />
                <col className="w-[400px]" />
                <col className="w-[280px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-indigo-brand text-[12.5px] font-bold uppercase leading-[15px] tracking-[0.02em] text-ink">
                  <th className="pb-[17px] font-bold">No</th>
                  <th className="pb-[17px] font-bold">Project</th>
                  <th className="pb-[17px] font-bold">Type</th>
                  <th className="pb-[17px] font-bold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={item.no} className="h-[78px] border-b border-[#dfe2e5]">
                    <td className="text-[15px] text-ink">{item.no}</td>
                    <td className="text-[21px] font-semibold text-indigo-brand">
                      {item.project}
                    </td>
                    <td className="text-[15px] text-ink">{item.type}</td>
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
                      No projects of this type yet.
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
