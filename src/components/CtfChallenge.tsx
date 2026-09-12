"use client";

import { useEffect, useState } from "react";
import Toast, { type ToastState } from "./Toast";

const ENCODED_FLAG = "d2ljeXN7d2VsY29tZV90b190aGVfY2hhcHRlcn0=";
const FLAG = "wicys{welcome_to_the_chapter}";

export default function CtfChallenge() {
  const [value, setValue] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const attempt = value.trim().toLowerCase();

    if (!attempt) {
      setToast({ id: Date.now(), tone: "warn", message: "Enter a flag first." });
      return;
    }

    if (attempt === FLAG) {
      setSolved(true);
      setToast({
        id: Date.now(),
        tone: "success",
        message: "Correct — flag captured. Welcome in.",
      });
      return;
    }

    setToast({ id: Date.now(), tone: "warn", message: "Not quite — try again." });
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="glass ring-brand flex flex-col gap-3.5 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm text-text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${solved ? "bg-green" : "bg-violet"}`}
            />
            A tiny challenge, on us
          </span>
          <span className="shrink-0 text-xs text-text-faint">web · 10 pts</span>
        </div>

        <p className="text-sm leading-relaxed text-text-muted">
          Decode the string below and submit it as{" "}
          <code className="text-text">wicys{"{...}"}</code>.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border bg-bg-2 px-4 py-3">
          <code className="block whitespace-nowrap font-mono text-sm tracking-wide text-green">
            {ENCODED_FLAG}
          </code>
        </div>

        {solved ? (
          <p className="rounded-2xl border border-green/30 bg-green/10 px-4 py-3 text-sm leading-relaxed text-text">
            Solved. That&apos;s the kind of thing we do most Fridays —{" "}
            <a href="/contact" className="font-semibold text-green underline-offset-2 hover:underline">
              come try a real one
            </a>
            .
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-2 sm:flex-row ${shake ? "shake" : ""}`}
          >
            <label htmlFor="ctf-flag" className="sr-only">
              Flag
            </label>
            <input
              id="ctf-flag"
              name="flag"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="wicys{...}"
              className="w-full flex-1 rounded-xl border border-border bg-bg-2 px-4 py-2.5 font-mono text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-green"
            />
            <button
              type="submit"
              className="sheen shrink-0 rounded-xl bg-green px-5 py-2.5 text-sm font-semibold text-on-green transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Submit
            </button>
          </form>
        )}

        {!solved && (
          <div>
            <button
              type="button"
              onClick={() => setHintOpen((v) => !v)}
              aria-expanded={hintOpen}
              className="text-xs font-medium text-text-faint transition-colors hover:text-green"
            >
              {hintOpen ? "Hide hint" : "Need a hint?"}
            </button>
            {hintOpen && (
              <p className="fade-up-sm mt-1.5 text-xs text-text-faint">
                It&apos;s Base64 — any decoder will do.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
