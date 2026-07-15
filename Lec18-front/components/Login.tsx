"use client";

import { useState } from "react";
import { useChat } from "@/app/ChatProvider";

export default function Login() {
  const { login } = useChat();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = fullName.trim();
    if (!trimmedEmail || !trimmedName) return;
    login({ email: trimmedEmail, fullName: trimmedName });
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur"
      >
        <h1 className="mb-1 text-2xl font-semibold">Welcome to Lec18 Chat</h1>
        <p className="mb-6 text-sm text-neutral-400">
          No password needed — just an email and a name.
        </p>

        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Full name
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Giorgi"
          className="mb-4 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-400"
          autoFocus
        />

        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="giorgi@example.com"
          className="mb-6 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-400"
        />

        <button
          type="submit"
          disabled={!email.trim() || !fullName.trim()}
          className="w-full rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enter chat
        </button>
      </form>
    </div>
  );
}
