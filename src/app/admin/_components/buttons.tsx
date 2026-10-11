"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { btn } from "./ui";

/** A submit button that goes quiet while its form's action is in flight. */
export function SubmitButton({
  children,
  pendingLabel,
  tone = "primary",
  size = "md",
  className = "",
  confirm,
  ...rest
}: {
  children: ReactNode;
  pendingLabel?: ReactNode;
  tone?: Parameters<typeof btn>[0];
  size?: Parameters<typeof btn>[1];
  className?: string;
  /** Asks first, for deletes and other changes that cannot be undone. */
  confirm?: string;
  "aria-label"?: string;
  title?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      {...rest}
      disabled={pending || rest.disabled}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={`${btn(tone, size)} ${className}`}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
