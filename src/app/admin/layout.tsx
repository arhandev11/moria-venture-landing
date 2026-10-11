import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "../globals.css";

// The same face as the public site; see app/[lang]/layout.tsx.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin — Moria Ventures" },
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The admin area's own root layout: the public site's lives under [lang], so
 * this one brings the document, in English only. The wrappers match what the
 * shared root layout used to give it, so the admin renders as before.
 */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <main className="flex-1">
          <div className="min-h-screen bg-shell text-ink">{children}</div>
        </main>
      </body>
    </html>
  );
}
