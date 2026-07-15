import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

// single shared socket instance, connected manually after login
export const socket: Socket = io(URL, {
  autoConnect: false,
});
