"use client";

import { useState } from "react";

const field =
  "w-full rounded-xl border border-border bg-bg-2 px-4 py-2.5 text-text outline-none transition-colors placeholder:text-text-faint focus:border-green";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-surface/50 p-7">
        <h2 className="font-display text-lg font-semibold text-text">
          Thanks, {data.name.split(" ")[0] || "there"}.
        </h2>
        <p className="mt-2 leading-relaxed text-text-muted">
          This is a demo form and nothing was actually sent — wire it to a
          handler or mail service before launch. For now, email us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4"
    >
      <label className="flex flex-col gap-1.5 text-sm text-text-muted">
        Name
        <input
          name="name"
          required
          value={data.name}
          onChange={update}
          placeholder="Your name"
          className={field}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-text-muted">
        Email
        <input
          name="email"
          type="email"
          required
          value={data.email}
          onChange={update}
          placeholder="you@srmist.edu.in"
          className={field}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-text-muted">
        Message
        <textarea
          name="message"
          required
          rows={4}
          value={data.message}
          onChange={update}
          placeholder="What would you like to know?"
          className={`${field} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="self-start rounded-full bg-green px-5 py-2.5 font-semibold text-[#17240a] transition-transform hover:-translate-y-0.5"
      >
        Send message
      </button>
    </form>
  );
}
