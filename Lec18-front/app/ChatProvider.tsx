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
import { GROUP_ID } from "@/lib/types";
import type { Me, Message, OnlineUsers } from "@/lib/types";

type ChatContextValue = {
  me: Me | null;
  onlineUsers: OnlineUsers;
  // messages grouped by conversation key: peer email (DM) or GROUP_ID (group)
  messagesByChat: Record<string, Message[]>;
  unreadByChat: Record<string, number>;
  // active conversation key, or null when none is open
  activeChat: string | null;
  login: (me: Me) => void;
  logout: () => void;
  openDM: (email: string) => void;
  openGroup: () => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = "chat:me";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>({});
  const [messagesByChat, setMessagesByChat] = useState<
    Record<string, Message[]>
  >({});
  const [unreadByChat, setUnreadByChat] = useState<Record<string, number>>({});
  const [activeChat, setActiveChat] = useState<string | null>(null);

  // keep latest me + activeChat available inside socket listeners without
  // re-registering them on every change
  const meRef = useRef<Me | null>(null);
  const activeChatRef = useRef<string | null>(null);
  meRef.current = me;
  activeChatRef.current = activeChat;

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
      const other = msg.from === current.email ? msg.to! : msg.from;

      setMessagesByChat((prev) => ({
        ...prev,
        [other]: [...(prev[other] ?? []), msg],
      }));

      // bump unread when the message is incoming and its thread isn't open
      if (msg.from !== current.email && activeChatRef.current !== other) {
        setUnreadByChat((prev) => ({
          ...prev,
          [other]: (prev[other] ?? 0) + 1,
        }));
      }
    }

    function onGroupMessage(msg: Message) {
      const current = meRef.current;
      if (!current) return;

      setMessagesByChat((prev) => ({
        ...prev,
        [GROUP_ID]: [...(prev[GROUP_ID] ?? []), msg],
      }));

      if (msg.from !== current.email && activeChatRef.current !== GROUP_ID) {
        setUnreadByChat((prev) => ({
          ...prev,
          [GROUP_ID]: (prev[GROUP_ID] ?? 0) + 1,
        }));
      }
    }

    // saved conversation restored from MongoDB, replaces local thread
    function onHistory({
      chat,
      messages,
    }: {
      chat: string;
      messages: Message[];
    }) {
      setMessagesByChat((prev) => ({ ...prev, [chat]: messages }));
    }

    socket.on("online:users", onOnlineUsers);
    socket.on("message:private", onPrivateMessage);
    socket.on("message:group", onGroupMessage);
    socket.on("history:load", onHistory);

    return () => {
      socket.off("online:users", onOnlineUsers);
      socket.off("message:private", onPrivateMessage);
      socket.off("message:group", onGroupMessage);
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
    setMessagesByChat({});
    setUnreadByChat({});
    setActiveChat(null);
  }, []);

  const openDM = useCallback((email: string) => {
    setActiveChat(email);
    setUnreadByChat((prev) => ({ ...prev, [email]: 0 }));

    // pull the saved conversation with this peer from the server
    const current = meRef.current;
    if (current) {
      socket.emit("history:load", { user: current.email, peer: email });
    }
  }, []);

  const openGroup = useCallback(() => {
    setActiveChat(GROUP_ID);
    setUnreadByChat((prev) => ({ ...prev, [GROUP_ID]: 0 }));
    socket.emit("history:load", { room: GROUP_ID });
  }, []);

  const closeChat = useCallback(() => setActiveChat(null), []);

  const sendMessage = useCallback((text: string) => {
    const current = meRef.current;
    const chat = activeChatRef.current;
    const trimmed = text.trim();
    if (!current || !chat || !trimmed) return;

    if (chat === GROUP_ID) {
      socket.emit("message:group", {
        from: current.email,
        fromName: current.fullName,
        text: trimmed,
      });
    } else {
      socket.emit("message:private", {
        from: current.email,
        to: chat,
        text: trimmed,
      });
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        me,
        onlineUsers,
        messagesByChat,
        unreadByChat,
        activeChat,
        login,
        logout,
        openDM,
        openGroup,
        closeChat,
        sendMessage,
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
