import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useDismissable<T extends HTMLElement>(
  open: boolean,
  onDismiss: () => void,
  triggerRef?: RefObject<HTMLElement | null>,
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        onDismiss();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onDismiss();
      triggerRef?.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss, open, triggerRef]);

  return containerRef;
}
