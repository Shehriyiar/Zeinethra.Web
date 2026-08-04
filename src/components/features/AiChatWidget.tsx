"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { api } from "@/lib/api";
import clsx from "clsx";

type Msg = { role: "user" | "assistant"; text: string };

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs]);

  async function send() {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setMsgs((p) => [...p, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await api.chat(text, sessionId);
      setSessionId(res.sessionId);
      setMsgs((p) => [...p, { role: "assistant", text: res.reply }]);
    } catch {
      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          text: "Sorry, I couldn\u2019t process that. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-white shadow-lg transition hover:scale-105"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-2xl sm:right-24">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-navy px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Bot size={18} />
          <span className="font-display text-sm font-semibold">
            Zeinethra AI
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setOpen(false)}
            className="rounded p-1 hover:bg-white/10"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setMsgs([]);
            }}
            className="rounded p-1 hover:bg-white/10"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto p-4"
        style={{ maxHeight: 340 }}
      >
        {msgs.length === 0 && (
          <p className="text-center text-sm text-muted">
            Ask me anything about Zeinethra.
          </p>
        )}
        {msgs.map((m, i) => (
          <div
            key={i}
            className={clsx(
              "max-w-[85%] rounded-xl px-3 py-2 text-sm",
              m.role === "user"
                ? "ml-auto bg-cyan text-white"
                : "bg-[var(--surface)] text-foreground"
            )}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="flex gap-1 text-muted">
            <span className="animate-bounce text-xl">&middot;</span>
            <span
              className="animate-bounce text-xl"
              style={{ animationDelay: "0.1s" }}
            >
              &middot;
            </span>
            <span
              className="animate-bounce text-xl"
              style={{ animationDelay: "0.2s" }}
            >
              &middot;
            </span>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-2 border-t border-[var(--border)] p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message\u2026"
          className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm outline-none focus:ring-2 ring-cyan"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan text-white disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
