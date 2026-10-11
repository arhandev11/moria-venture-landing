import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await readSession()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-[380px]">
        <Image
          src="/assets/brand/logo-wordmark.svg"
          alt="Moria Ventures"
          width={323}
          height={49}
          priority
          className="mx-auto h-7 w-auto"
        />
        <div className="mt-8 rounded-lg border border-rule bg-white p-6 shadow-sm">
          <h1 className="text-[20px] font-bold text-ink">Admin sign in</h1>
          <p className="mt-1 text-[13px] text-ink-muted">Manage the KNEKS page and its investor requests.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
