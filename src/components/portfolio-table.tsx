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
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[80px] pt-[70px] md:px-10 lg:px-20">
          <p className="t-eyebrow text-ink/70">Filter by Sector</p>
          <div className="mt-[28px] flex flex-wrap gap-8">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`t-eyebrow border-b-2 pb-1 transition-colors ${
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
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-[155px] pt-[169px] md:px-10 lg:px-20">
          <h2 className="t-section text-right text-indigo-brand">
            Active Investments
          </h2>

          <div className="mt-[85px] overflow-x-auto lg:ml-auto lg:w-[72%]">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="t-eyebrow border-b-2 border-rule text-ink/60">
                  <th className="pb-5 font-bold">Company</th>
                  <th className="pb-5 font-bold">Sector</th>
                  <th className="pb-5 font-bold">Stage</th>
                  <th className="pb-5 font-bold">Geography</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={item.company} className="border-b border-rule/70">
                    <td className="py-[25px] text-[21px] font-semibold text-indigo-brand">
                      {item.company}
                    </td>
                    <td className="py-[25px] text-[16px] text-ink-muted">
                      {item.sector}
                    </td>
                    <td className="t-eyebrow py-[25px] text-indigo-brand">
                      {item.stage}
                    </td>
                    <td className="py-[25px] text-[16px] text-ink-muted">
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
