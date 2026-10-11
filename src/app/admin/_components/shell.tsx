"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { FeedbackProvider } from "./feedback";
import { BuildingIcon, CloseIcon, HomeIcon, InboxIcon, ListIcon, LogoutIcon, MenuIcon, UserIcon, UsersIcon } from "./icons";
import { homeFor, SME_EDITORS, SUPERADMIN_ONLY, type AdminRole } from "@/lib/auth/roles";
import { FOCUS } from "./ui";

const EVERYONE: readonly AdminRole[] = ["superadmin", "kneks"];

/**
 * The nav, with who may use each entry. Hiding an entry is only a courtesy;
 * the page behind it checks the same role list on the server.
 */
const GROUPS = [
  {
    label: "KNEKS programme",
    links: [
      { href: "/admin", label: "Overview", icon: HomeIcon, exact: true, roles: SUPERADMIN_ONLY },
      { href: "/admin/submissions", label: "Investor requests", icon: InboxIcon, roles: SUPERADMIN_ONLY },
      { href: "/admin/smes", label: "SMEs", icon: BuildingIcon, roles: SME_EDITORS },
      { href: "/admin/options", label: "Form options", icon: ListIcon, roles: SUPERADMIN_ONLY },
    ],
  },
  {
    label: "Settings",
    links: [
      { href: "/admin/users", label: "Admins", icon: UsersIcon, roles: SUPERADMIN_ONLY },
      { href: "/admin/account", label: "Account", icon: UserIcon, roles: EVERYONE },
    ],
  },
];

const TITLES: [RegExp, string[]][] = [
  [/^\/admin$/, ["Overview"]],
  [/^\/admin\/submissions\/\d+$/, ["Investor requests", "Request"]],
  [/^\/admin\/submissions/, ["Investor requests"]],
  [/^\/admin\/smes\/new$/, ["SMEs", "Add SME"]],
  [/^\/admin\/smes\/\d+$/, ["SMEs", "Edit SME"]],
  [/^\/admin\/smes/, ["SMEs"]],
  [/^\/admin\/options/, ["Form options"]],
  [/^\/admin\/users/, ["Admins"]],
  [/^\/admin\/account/, ["Account"]],
];

/**
 * The signed-in frame: a white sidebar with the wordmark and grouped nav,
 * a top bar with where you are and who you are. Below lg the sidebar is a
 * drawer behind the menu button. One nav serves both, so the markup never
 * doubles up.
 */
export function AdminShell({
  user,
  unread,
  logout,
  children,
}: {
  user: { name: string; email: string; role: AdminRole };
  unread: number;
  logout: () => Promise<void>;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const crumbs = TITLES.find(([re]) => re.test(pathname))?.[1] ?? ["Admin"];
  const groups = GROUPS.map((g) => ({ ...g, links: g.links.filter((l) => l.roles.includes(user.role)) })).filter((g) => g.links.length);

  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-shell">
        {open ? <div aria-hidden onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-ink/40 lg:hidden" /> : null}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-ink/10 bg-white transition-transform motion-reduce:transition-none lg:translate-x-0 ${
            open ? "translate-x-0 shadow-xl" : "invisible -translate-x-full lg:visible"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/10 px-5">
            <Link href={homeFor(user.role)} onClick={() => setOpen(false)} className={`rounded ${FOCUS}`}>
              <Image src="/assets/brand/logo-wordmark.svg" alt="Moria Ventures admin" width={323} height={49} className="h-[22px] w-auto" priority />
            </Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className={`rounded-md p-1 text-ink-muted hover:bg-shell lg:hidden ${FOCUS}`}>
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
            {groups.map((group) => (
              <div key={group.label} className="mb-5">
                <p className="px-3 pb-1.5 text-[12px] font-medium text-ink/45">{group.label}</p>
                <ul className="space-y-0.5">
                  {group.links.map(({ href, label, icon: Icon, exact }) => {
                    const active = exact ? pathname === href : pathname.startsWith(href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`relative flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] font-medium transition-colors ${
                            active ? "bg-indigo-brand/[0.07] text-indigo-brand" : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink"
                          } ${FOCUS}`}
                        >
                          {active ? <i aria-hidden className="absolute -left-3 inset-y-1.5 w-[3px] rounded-r bg-gold" /> : null}
                          <Icon className="size-[18px] shrink-0" />
                          {label}
                          {href === "/admin/submissions" && unread > 0 ? (
                            <span className="ml-auto rounded-full bg-gold px-1.5 text-[11px] font-bold leading-[18px] text-indigo-brand" title={`${unread} new`}>
                              {unread}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <a
            href="/kneks"
            target="_blank"
            rel="noopener"
            className={`mx-3 mb-4 flex items-center justify-between rounded-md border border-ink/10 px-3 py-2 text-[13px] font-medium text-ink-muted hover:border-indigo-brand/30 hover:text-indigo-brand ${FOCUS}`}
          >
            View the KNEKS page
            <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
            </svg>
          </a>
        </aside>

        <div className="lg:pl-[240px]">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink/10 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className={`-ml-1 rounded-md p-1.5 text-ink hover:bg-shell lg:hidden ${FOCUS}`}>
              <MenuIcon className="size-5" />
            </button>
            <ol className="flex min-w-0 items-center gap-1.5 text-[14px]">
              {crumbs.map((crumb, i) => (
                <li key={crumb} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 ? <span aria-hidden className="text-ink/30">/</span> : null}
                  <span className={`truncate ${i === crumbs.length - 1 ? "font-semibold text-ink" : "text-ink-muted"}`}>{crumb}</span>
                </li>
              ))}
            </ol>
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <Link href="/admin/account" className={`flex items-center gap-2 rounded-full ${FOCUS}`} title={user.email}>
                <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-indigo-brand text-[13px] font-bold text-gold">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </span>
                <span className="hidden max-w-[220px] truncate text-[13px] text-ink-muted md:block">{user.email}</span>
              </Link>
              <form action={logout}>
                <button type="submit" className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-ink-muted hover:bg-shell hover:text-ink ${FOCUS}`}>
                  <LogoutIcon className="size-4" />
                  <span className="hidden sm:inline">Sign out</span>
                  <span className="sr-only sm:hidden">Sign out</span>
                </button>
              </form>
            </div>
          </header>
          <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </div>
      </div>
    </FeedbackProvider>
  );
}
