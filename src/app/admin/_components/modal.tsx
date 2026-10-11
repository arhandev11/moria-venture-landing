"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";
import { FOCUS } from "./ui";

/**
 * A native modal dialog. showModal brings the focus trap, Esc and the inert
 * page; closing hands focus back to whatever opened it. Every way out (Esc,
 * the close button, a backdrop click, Cancel) goes through onRequestClose so
 * the caller can ask before throwing away unsaved changes.
 *
 * Full width as a bottom sheet on phones, a centred panel from sm up.
 */
export function Modal({
  open,
  onRequestClose,
  title,
  description,
  children,
  size = "md",
}: {
  open: boolean;
  onRequestClose: () => void;
  title: string;
  description?: ReactNode;
  /** ModalBody and ModalFooter, usually inside one form so the footer's button submits it. */
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
      // showModal lands on the close button; start where the work is instead.
      dialog
        .querySelector<HTMLElement>("[data-autofocus], [data-modal-body] :is(input:not([type=hidden]):not([type=radio]), textarea, select)")
        ?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
      if (opener.current instanceof HTMLElement && opener.current.isConnected) opener.current.focus();
    }
  }, [open]);

  const widths = { sm: "sm:max-w-[420px]", md: "sm:max-w-[560px]", lg: "sm:max-w-[760px]" };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // Esc fires cancel; it is turned into a request so a dirty form can object.
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRequestClose();
      }}
      className={`m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-2xl border border-ink/10 bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/40 sm:m-auto sm:max-h-[88dvh] sm:w-[calc(100%-32px)] sm:rounded-xl ${widths[size]}`}
    >
      {open ? (
        <div className="flex max-h-[inherit] flex-col [&>form]:flex [&>form]:min-h-0 [&>form]:flex-1 [&>form]:flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4">
            <div className="min-w-0">
              <h2 id={titleId} className="text-[16px] font-semibold text-ink">
                {title}
              </h2>
              {description ? <p className="mt-0.5 text-[13px] text-ink-muted">{description}</p> : null}
            </div>
            <button
              type="button"
              onClick={onRequestClose}
              aria-label="Close"
              className={`-mr-1.5 -mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-shell hover:text-ink ${FOCUS}`}
            >
              <CloseIcon className="size-[18px]" />
            </button>
          </div>
          {children}
        </div>
      ) : null}
    </dialog>
  );
}

/** The scrolling middle of a modal. */
export function ModalBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-modal-body className={`min-h-0 flex-1 overflow-y-auto px-5 py-5 ${className}`}>
      {children}
    </div>
  );
}

/** The modal's action row, pinned under the body. A `start` slot holds a lone destructive action. */
export function ModalFooter({ children, start }: { children: ReactNode; start?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-t border-ink/10 bg-shell px-5 py-3.5">
      {start ? <div className="mr-auto">{start}</div> : null}
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  );
}
