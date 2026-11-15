import { useEffect, useLayoutEffect, useRef, useState } from "react";
export type RegionState = "empty" | "loading" | "error";
export type ContentRegionProps = {
  id: string;
  title: string;
  initialState?: RegionState;
  recover?: () => Promise<void>;
};
export function ContentRegion({
  id,
  title,
  initialState = "empty",
  recover,
}: ContentRegionProps) {
  const [state, setState] = useState(initialState);
  const pending = useRef(false);
  const retryButton = useRef<HTMLButtonElement>(null);
  const message = useRef<HTMLParagraphElement>(null);
  const retainFocus = useRef(false);
  useEffect(() => {
    function moved(event: FocusEvent) {
      if (pending.current && event.target !== retryButton.current)
        retainFocus.current = false;
    }
    document.addEventListener("focusin", moved);
    return () => document.removeEventListener("focusin", moved);
  }, []);
  useLayoutEffect(() => {
    if (state === "empty" && retainFocus.current) {
      message.current?.focus();
      retainFocus.current = false;
    }
  }, [state]);
  async function retry() {
    if (!recover || pending.current) return;
    retainFocus.current = document.activeElement === retryButton.current;
    pending.current = true;
    setState("loading");
    try {
      await recover();
      setState("empty");
    } catch {
      setState("error");
    } finally {
      pending.current = false;
    }
  }
  return (
    <section className="content-region" aria-labelledby={`${id}-title`}>
      <div className="region-heading">
        <span className="region-mark" aria-hidden="true" />
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className="region-body">
        <span className="availability-icon" aria-hidden="true">
          {state === "error" ? "!" : "—"}
        </span>
        <p
          ref={message}
          tabIndex={-1}
          role={state === "error" ? "alert" : "status"}
        >
          <span className="sr-only">{title}: </span>
          {state === "empty"
            ? "Conteúdo ainda não disponível"
            : state === "loading"
              ? "Carregando conteúdo"
              : "Não foi possível carregar este conteúdo"}
        </p>
        {recover && state !== "empty" && (
          <button
            ref={retryButton}
            aria-busy={state === "loading"}
            className="retry"
            disabled={state === "loading"}
            onClick={() => void retry()}
          >
            Tentar novamente
          </button>
        )}
      </div>
    </section>
  );
}
