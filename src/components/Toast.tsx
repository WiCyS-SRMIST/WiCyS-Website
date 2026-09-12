"use client";

export interface ToastState {
  id: number;
  tone: "success" | "warn";
  message: string;
}

export default function Toast({
  toast,
  onClose,
}: {
  toast: ToastState | null;
  onClose: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-5 z-[60] flex justify-center px-4"
    >
      {toast && (
        <div
          key={toast.id}
          role="status"
          className={`toast-in glass pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border-l-4 px-4 py-3 ${
            toast.tone === "success" ? "border-l-green" : "border-l-gold"
          }`}
        >
          <span
            className={`mt-0.5 shrink-0 ${
              toast.tone === "success" ? "text-green" : "text-gold"
            }`}
            aria-hidden
          >
            {toast.tone === "success" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12.5 2.5 2.5L16 9.5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
            )}
          </span>
          <p className="text-sm font-medium leading-snug text-text">
            {toast.message}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="ml-1 shrink-0 text-text-faint transition-colors hover:text-text"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
