"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CloseIcon } from "./icons";
import { Modal, ModalBody, ModalFooter } from "./modal";
import { btn, FOCUS } from "./ui";

type Toast = { id: number; message: string; tone: "success" | "error"; action?: { label: string; run: () => void } };
type ConfirmOptions = { title: string; body?: ReactNode; confirmLabel: string; tone?: "danger" | "primary" };

type Feedback = {
  toast: (message: string, options?: { tone?: Toast["tone"]; action?: Toast["action"] }) => void;
  /** Resolves true when the person confirms, false on cancel, Esc or backdrop. */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const FeedbackContext = createContext<Feedback | null>(null);

/**
 * Toasts and the confirm dialog, shared by every admin screen. Toasts sit
 * bottom-right (bottom-centre on phones), last five seconds, and can carry
 * one action such as Undo. The confirm dialog replaces window.confirm so a
 * destructive step looks and reads like the rest of the admin.
 */
export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [asking, setAsking] = useState<ConfirmOptions | null>(null);
  const answer = useRef<((ok: boolean) => void) | null>(null);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const toast = useCallback<Feedback["toast"]>(
    (message, options) => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { id, message, tone: options?.tone ?? "success", action: options?.action }]);
      window.setTimeout(() => dismiss(id), options?.action ? 7000 : 5000);
    },
    [dismiss],
  );

  const confirm = useCallback<Feedback["confirm"]>((options) => {
    setAsking(options);
    return new Promise<boolean>((resolve) => {
      answer.current = resolve;
    });
  }, []);

  const settle = (ok: boolean) => {
    answer.current?.(ok);
    answer.current = null;
    setAsking(null);
  };

  return (
    <FeedbackContext.Provider value={{ toast, confirm }}>
      {children}

      <Modal open={!!asking} onRequestClose={() => settle(false)} title={asking?.title ?? ""} size="sm">
        <ModalBody>
          <div className="text-[14px] leading-[22px] text-ink-muted">{asking?.body}</div>
        </ModalBody>
        <ModalFooter>
          {/* Cancel takes focus: a stray Enter should never delete anything. */}
          <button type="button" data-autofocus onClick={() => settle(false)} className={btn("secondary")}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => settle(true)}
            className={btn(asking?.tone === "primary" ? "primary" : "destructive")}
          >
            {asking?.confirmLabel}
          </button>
        </ModalFooter>
      </Modal>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex w-full max-w-[380px] items-center gap-3 rounded-lg px-4 py-3 text-[13px] shadow-lg ring-1 ${
              t.tone === "error" ? "bg-red-700 text-white ring-red-800" : "bg-ink text-white ring-black/10"
            }`}
          >
            <span aria-hidden className={`size-2 shrink-0 rounded-full ${t.tone === "error" ? "bg-white" : "bg-gold"}`} />
            <p className="min-w-0 flex-1">{t.message}</p>
            {t.action ? (
              <button
                type="button"
                onClick={() => {
                  t.action?.run();
                  dismiss(t.id);
                }}
                className="shrink-0 rounded px-1.5 py-0.5 font-semibold text-gold hover:underline focus-visible:outline-2 focus-visible:outline-gold"
              >
                {t.action.label}
              </button>
            ) : null}
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className={`shrink-0 rounded text-white/60 hover:text-white ${FOCUS}`}>
              <CloseIcon className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const value = useContext(FeedbackContext);
  if (!value) throw new Error("useFeedback needs a FeedbackProvider above it");
  return value;
}
