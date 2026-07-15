"use client";

import { ChatProvider, useChat } from "./ChatProvider";
import Login from "@/components/Login";
import Chat from "@/components/Chat";

function Gate() {
  const { me } = useChat();
  return me ? <Chat /> : <Login />;
}

export default function Home() {
  return (
    <ChatProvider>
      <Gate />
    </ChatProvider>
  );
}
