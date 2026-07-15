"use client";

import { useChat } from "@/app/ChatProvider";
import OnlineSidebar from "./OnlineSidebar";
import ChatPanel from "./ChatPanel";

export default function Chat() {
  const { me, logout, onlineUsers, activeChat } = useChat();
  if (!me) return null;

  const otherCount = Object.keys(onlineUsers).filter(
    (email) => email !== me.email,
  ).length;

  return (
    <div className="flex flex-1 flex-col">
      {/* top bar */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <h1 className="text-lg font-semibold">Lec18 Chat</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            Signed in as{" "}
            <span className="font-medium text-neutral-200">{me.fullName}</span>
          </span>
          <button
            onClick={logout}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </header>

      {/* body: main area + online sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 overflow-hidden">
          {activeChat ? (
            <ChatPanel />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="max-w-md text-center">
                <div className="mb-4 text-5xl">💬</div>
                <h2 className="mb-2 text-xl font-semibold">
                  {otherCount > 0
                    ? "Pick someone to chat with"
                    : "Waiting for others..."}
                </h2>
                <p className="text-sm text-neutral-400">
                  Open the group chat or pick an online user from the right
                  sidebar. Messages open right here.
                </p>
              </div>
            </div>
          )}
        </main>

        <OnlineSidebar />
      </div>
    </div>
  );
}
