"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/submissions", label: "Investor requests" },
  { href: "/admin/smes", label: "SMEs" },
  { href: "/admin/options", label: "Form options" },
  { href: "/admin/users", label: "Admins" },
  { href: "/admin/account", label: "Account" },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav className="-mb-px flex gap-5 overflow-x-auto text-[13px] [scrollbar-width:none]">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 py-3 font-semibold transition-colors ${
              active ? "border-gold text-indigo-brand" : "border-transparent text-ink-muted hover:text-indigo-brand"
            }`}
          >
            {link.label}
            {link.href === "/admin/submissions" && unread > 0 ? (
              <span className="rounded-full bg-gold px-1.5 text-[11px] font-bold text-indigo-brand">{unread}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
