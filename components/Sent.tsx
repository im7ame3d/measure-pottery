"use client";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Shown in place of the form once it has been sent. */
  message: React.ReactNode;
  /** When set, the fields are POSTed here as JSON; otherwise submitting just shows the message. */
  endpoint?: string;
  /** Extra fields sent with the form (e.g. the page it was sent from). */
  extra?: Record<string, string>;
  /** Shown under the form if sending fails. */
  error?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/** Wraps a form: on submit, sends it (if an endpoint is given) and swaps it for a confirmation message. */
export default function SentForm({ children, message, endpoint, extra, error, className, style }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  if (state === "sent") return <div className={`success ${className ?? ""}`} style={style} role="status">{message}</div>;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) return setState("sent");
    setState("sending");
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, ...extra }) });
      setState(res.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  return (
    <form className={className} style={style} onSubmit={submit} aria-busy={state === "sending"}>
      {/* a disabled fieldset locks every field and the button while sending */}
      <fieldset disabled={state === "sending"} className="form-fields">{children}</fieldset>
      {state === "failed" && error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
