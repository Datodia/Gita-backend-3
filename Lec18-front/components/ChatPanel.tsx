"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/app/ChatProvider";
import { GROUP_ID } from "@/lib/types";

export default function ChatPanel() {
  const {
    me,
    activeChat,
    onlineUsers,
    messagesByChat,
    closeChat,
    sendMessage,
  } = useChat();

  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = activeChat ? messagesByChat[activeChat] ?? [] : [];

  // auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length, activeChat]);

  if (!activeChat) return null;

  const isGroup = activeChat === GROUP_ID;
  const peer = onlineUsers[activeChat];
  const title = isGroup ? "Group Chat" : peer?.fullName ?? activeChat;
  const subtitle = isGroup ? "Everyone online" : activeChat;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{title}</p>
          <p className="truncate text-xs text-neutral-500">{subtitle}</p>
        </div>
        <button
          onClick={closeChat}
          className="rounded-lg px-2 py-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-6">
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
              <div
                className={`max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col`}
              >
                {/* show sender name in group for other people's messages */}
                {isGroup && !mine && (
                  <span className="mb-0.5 px-1 text-xs text-neutral-500">
                    {m.fromName ?? m.from}
                  </span>
                )}
                <span
                  className={`break-words rounded-2xl px-3 py-2 text-sm ${
                    mine
                      ? "rounded-br-sm bg-indigo-500 text-white"
                      : "rounded-bl-sm bg-white/10 text-neutral-100"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* input */}
      <form
        onSubmit={handleSend}
        className="flex gap-2 border-t border-white/10 p-4"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${title}...`}
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
  );
}
