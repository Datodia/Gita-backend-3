"use client";

import { useChat } from "@/app/ChatProvider";
import { GROUP_ID } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function OnlineSidebar() {
  const { me, onlineUsers, openDM, openGroup, activeChat, unreadByChat } =
    useChat();

  const entries = Object.entries(onlineUsers);
  const others = entries.filter(([email]) => email !== me?.email);
  const groupUnread = unreadByChat[GROUP_ID] ?? 0;

  return (
    <aside className="flex w-72 shrink-0 flex-col border-l border-white/10 bg-black/20">
      {/* group chat entry */}
      <div className="border-b border-white/10 p-2">
        <button
          onClick={openGroup}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/10 ${
            activeChat === GROUP_ID ? "bg-white/10" : ""
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/80 text-base">
            👥
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">
              Group Chat
            </span>
            <span className="block truncate text-xs text-neutral-500">
              Everyone online
            </span>
          </span>
          {groupUnread > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1.5 text-xs font-semibold">
              {groupUnread}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">
          Online — {entries.length}
        </h2>
      </div>

      <ul className="flex-1 overflow-y-auto p-2">
        {others.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-neutral-500">
            No one else is online yet. Open another tab and log in as someone
            else.
          </li>
        )}

        {others.map(([email, user]) => {
          const unread = unreadByChat[email] ?? 0;
          return (
            <li key={email}>
              <button
                onClick={() => openDM(email)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/10 ${
                  activeChat === email ? "bg-white/10" : ""
                }`}
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/80 text-xs font-semibold">
                  {initials(user.fullName)}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black/40 bg-emerald-400" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {user.fullName}
                  </span>
                  <span className="block truncate text-xs text-neutral-500">
                    {email}
                  </span>
                </span>
                {unread > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1.5 text-xs font-semibold">
                    {unread}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {me && (
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 text-xs font-semibold">
            {initials(me.fullName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {me.fullName}{" "}
              <span className="text-xs text-neutral-500">(you)</span>
            </span>
            <span className="block truncate text-xs text-neutral-500">
              {me.email}
            </span>
          </span>
        </div>
      )}
    </aside>
  );
}
