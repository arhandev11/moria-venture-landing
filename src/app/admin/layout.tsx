import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin — Moria Ventures" },
  robots: { index: false, follow: false, nocache: true },
};

/** The admin area's backdrop. The site's header and footer are left out by PublicOnly. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-shell text-ink">{children}</div>;
}
