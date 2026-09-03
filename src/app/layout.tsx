import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Stand-in for the brand face: the deck's PDFs ship type as outlines, so the
// original family name is not recoverable from the export.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Moria Ventures",
    template: "%s — Moria Ventures",
  },
  description:
    "PT Moria Global Ventures — Shariah-compliant capital connecting Indonesia and the Gulf through venture capital, project finance, and venture building.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
