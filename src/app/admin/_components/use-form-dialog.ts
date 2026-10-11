"use client";

import { useCallback, useState } from "react";
import { useFeedback } from "./feedback";

/**
 * Open/close state for a dialog that holds a form. Typing marks it dirty;
 * closing a dirty one asks first, so a stray Esc or backdrop click never
 * throws work away.
 */
export function useFormDialog<T>() {
  const { confirm } = useFeedback();
  const [subject, setSubject] = useState<T | null>(null);
  const [dirty, setDirty] = useState(false);

  const open = useCallback((value: T) => {
    setDirty(false);
    setSubject(value);
  }, []);

  const close = useCallback(() => {
    setDirty(false);
    setSubject(null);
  }, []);

  const requestClose = useCallback(async () => {
    if (
      dirty &&
      !(await confirm({
        title: "Discard your changes?",
        body: "What you typed in this form has not been saved.",
        confirmLabel: "Discard changes",
      }))
    ) {
      return;
    }
    close();
  }, [dirty, confirm, close]);

  const markDirty = useCallback(() => setDirty(true), []);

  return { subject, isOpen: subject !== null, open, close, requestClose, markDirty };
}
