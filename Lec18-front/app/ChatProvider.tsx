"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "@/lib/socket";
import type { Me, Message, OnlineUsers } from "@/lib/types";

type ChatContextValue = {
  me: Me | null;
  onlineUsers: OnlineUsers;
  // messages grouped by the *other* user's email
  messagesByUser: Record<string, Message[]>;
  unreadByUser: Record<string, number>;
  activeDM: string | null;
  login: (me: Me) => void;
  logout: () => void;
  openDM: (email: string) => void;
  closeDM: () => void;
  sendPrivate: (to: string, text: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = "chat:me";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>({});
  const [messagesByUser, setMessagesByUser] = useState<
    Record<string, Message[]>
  >({});
  const [unreadByUser, setUnreadByUser] = useState<Record<string, number>>({});
  const [activeDM, setActiveDM] = useState<string | null>(null);

  // keep latest me + activeDM available inside socket listeners without
  // re-registering them on every change
  const meRef = useRef<Me | null>(null);
  const activeDMRef = useRef<string | null>(null);
  meRef.current = me;
  activeDMRef.current = activeDM;

  // restore session from localStorage on first mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setMe(JSON.parse(raw) as Me);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // register socket listeners once
  useEffect(() => {
    function onOnlineUsers(users: OnlineUsers) {
      setOnlineUsers(users);
    }

    function onPrivateMessage(msg: Message) {
      const current = meRef.current;
      if (!current) return;
      const other = msg.from === current.email ? msg.to : msg.from;

      setMessagesByUser((prev) => ({
        ...prev,
        [other]: [...(prev[other] ?? []), msg],
      }));

      // bump unread when the message is incoming and its thread isn't open
      if (msg.from !== current.email && activeDMRef.current !== other) {
        setUnreadByUser((prev) => ({
          ...prev,
          [other]: (prev[other] ?? 0) + 1,
        }));
      }
    }

    // saved conversation restored from MongoDB, replaces local thread
    function onHistory({
      peer,
      messages,
    }: {
      peer: string;
      messages: Message[];
    }) {
      setMessagesByUser((prev) => ({ ...prev, [peer]: messages }));
    }

    socket.on("online:users", onOnlineUsers);
    socket.on("message:private", onPrivateMessage);
    socket.on("history:load", onHistory);

    return () => {
      socket.off("online:users", onOnlineUsers);
      socket.off("message:private", onPrivateMessage);
      socket.off("history:load", onHistory);
    };
  }, []);

  // connect + announce presence whenever `me` becomes set
  useEffect(() => {
    if (!me) return;

    function announce() {
      socket.emit("add:online", {
        email: me!.email,
        fullName: me!.fullName,
      });
    }

    if (!socket.connected) {
      socket.connect();
      socket.on("connect", announce);
    } else {
      announce();
    }

    return () => {
      socket.off("connect", announce);
    };
  }, [me]);

  const login = useCallback((next: Me) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setMe(next);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    socket.disconnect();
    setMe(null);
    setOnlineUsers({});
    setMessagesByUser({});
    setUnreadByUser({});
    setActiveDM(null);
  }, []);

  const openDM = useCallback((email: string) => {
    setActiveDM(email);
    setUnreadByUser((prev) => ({ ...prev, [email]: 0 }));

    // pull the saved conversation with this peer from the server
    const current = meRef.current;
    if (current) {
      socket.emit("history:load", { user: current.email, peer: email });
    }
  }, []);

  const closeDM = useCallback(() => setActiveDM(null), []);

  const sendPrivate = useCallback((to: string, text: string) => {
    const current = meRef.current;
    const trimmed = text.trim();
    if (!current || !trimmed) return;
    socket.emit("message:private", {
      from: current.email,
      to,
      text: trimmed,
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        me,
        onlineUsers,
        messagesByUser,
        unreadByUser,
        activeDM,
        login,
        logout,
        openDM,
        closeDM,
        sendPrivate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
