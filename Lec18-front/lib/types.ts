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

export type Message = {
  from: string; // sender email
  to: string; // recipient email
  text: string;
  ts: number;
};
