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
  /** Instead of POSTing, build a URL from the fields (e.g. a WhatsApp message) and open it. */
  handoff?: (fields: Record<string, string>) => string;
  /** Shown under the form if sending fails. */
  error?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/** Wraps a form: on submit, sends it (if an endpoint is given) and swaps it for a confirmation message. */
export default function SentForm({ children, message, endpoint, extra, handoff, error, className, style }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  if (state === "sent") return <div className={`success ${className ?? ""}`} style={style} role="status">{message}</div>;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = Object.fromEntries([...new FormData(e.currentTarget).entries()].map(([k, v]) => [k, String(v).trim()]));
    if (handoff) {
      if (fields.website) return setState("sent"); // honeypot: bots fill the hidden field
      // opened straight from the submit click so browsers don't block it as a pop-up
      const url = handoff(fields);
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url;
      return setState("sent");
    }
    if (!endpoint) return setState("sent");
    setState("sending");
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
