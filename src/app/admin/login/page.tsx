import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await readSession()) redirect("/admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-clip px-4 py-16">
      {/* The site's line-work, faint in the corner: the one brand flourish on this screen. */}
      <Image
        src="/assets/brand/supergraphic-corner.svg"
        alt=""
        aria-hidden
        width={384}
        height={504}
        className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-auto select-none opacity-40 sm:h-[560px]"
      />
      <div className="relative w-full max-w-[400px]">
        <Image src="/assets/brand/logo-wordmark.svg" alt="Moria Ventures" width={323} height={49} priority className="mx-auto h-7 w-auto" />
        <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6 shadow-[0_1px_2px_rgb(32_31_34/0.04),0_8px_24px_rgb(32_31_34/0.06)] sm:p-8">
          <h1 className="text-[20px] font-bold text-ink">Sign in to the admin</h1>
          <p className="mt-1 text-[14px] text-ink-muted">Investor requests, SMEs and form options for the KNEKS page.</p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-[12px] text-ink-muted">PT Moria Ventures Capital</p>
      </div>
    </div>
  );
}
