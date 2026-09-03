"use client";

import { useState } from "react";

export type Investment = {
  company: string;
  sector: string;
  stage: string;
  geography: string;
  group: string;
};

const FILTERS = [
  "All",
  "Fintech",
  "Agritech",
  "Logistics",
  "SaaS",
  "Halal Economy",
];

export function PortfolioFilter({
  investments,
}: {
  investments: Investment[];
}) {
  const [active, setActive] = useState("All");
  const rows =
    active === "All"
      ? investments
      : investments.filter((item) => item.group === active);

  return (
    <>
      <div className="border-b border-rule/60 bg-cream">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/70">
            Filter by Sector
          </p>
          <div className="mt-4 flex flex-wrap gap-6">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`border-b-2 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  active === filter
                    ? "border-gold text-indigo-brand"
                    : "border-transparent text-ink/60 hover:text-indigo-brand"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-shell">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10">
          <h2 className="display text-right text-indigo-brand text-[34px] sm:text-[44px] lg:text-[52px]">
            Active Investments
          </h2>

          <div className="mt-12 overflow-x-auto lg:ml-auto lg:w-[72%]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b-2 border-rule text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                  <th className="py-3 font-bold">Company</th>
                  <th className="py-3 font-bold">Sector</th>
                  <th className="py-3 font-bold">Stage</th>
                  <th className="py-3 font-bold">Geography</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={item.company} className="border-b border-rule/70">
                    <td className="py-5 text-[16px] font-semibold text-indigo-brand">
                      {item.company}
                    </td>
                    <td className="py-5 text-[13px] text-ink-muted">
                      {item.sector}
                    </td>
                    <td className="py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-brand">
                      {item.stage}
                    </td>
                    <td className="py-5 text-[13px] text-ink-muted">
                      {item.geography}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-[13px] text-ink-muted"
                    >
                      No disclosed investments in this sector yet.
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
