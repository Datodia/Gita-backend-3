export type Me = {
  email: string;
  fullName: string;
};

export type OnlineUser = {
  fullName: string;
  socketId: string;
};

// keyed by email
export type OnlineUsers = Record<string, OnlineUser>;

// shared group room id (same value on client + server)
export const GROUP_ID = "group:general";

export type Message = {
  from: string; // sender email
  fromName?: string; // sender display name (used in group messages)
  to?: string; // recipient email (DM only)
  room?: string; // group room id (group only)
  text: string;
  ts: number;
};
