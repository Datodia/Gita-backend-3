"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/app/ChatProvider";

export default function DMModal() {
  const {
    me,
    activeDM,
    onlineUsers,
    messagesByUser,
    closeDM,
    sendPrivate,
  } = useChat();

  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = activeDM ? messagesByUser[activeDM] ?? [] : [];

  // auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length, activeDM]);

  // close on Escape
  useEffect(() => {
    if (!activeDM) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDM();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeDM, closeDM]);

  if (!activeDM) return null;

  const peer = onlineUsers[activeDM];
  const peerName = peer?.fullName ?? activeDM;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!activeDM || !text.trim()) return;
    sendPrivate(activeDM, text);
    setText("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={closeDM}
    >
      <div
        className="flex h-[70vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{peerName}</p>
            <p className="truncate text-xs text-neutral-500">{activeDM}</p>
          </div>
          <button
            onClick={closeDM}
            className="rounded-lg px-2 py-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="mt-6 text-center text-sm text-neutral-500">
              No messages yet. Say hi 👋
            </p>
          )}
          {messages.map((m, i) => {
            const mine = m.from === me?.email;
            return (
              <div
                key={`${m.ts}-${i}`}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[75%] break-words rounded-2xl px-3 py-2 text-sm ${
                    mine
                      ? "rounded-br-sm bg-indigo-500 text-white"
                      : "rounded-bl-sm bg-white/10 text-neutral-100"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* input */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t border-white/10 p-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${peerName}...`}
            className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            autoFocus
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
