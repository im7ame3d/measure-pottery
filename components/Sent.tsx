"use client";

import { useState } from "react";

/** Wraps a form: on submit, swaps it for a confirmation message. Hook up a real endpoint later. */
export default function SentForm({ children, message, className, style }: { children: React.ReactNode; message: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [sent, setSent] = useState(false);
  if (sent) return <div className={`success ${className ?? ""}`} style={style} role="status">{message}</div>;
  return <form className={className} style={style} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>{children}</form>;
}
