// src/services/socket.ts
import { io, Socket } from 'socket.io-client';

// Replace with your WebSocket server URL
const SOCKET_URL = 'http://localhost:3000';

// Create and export the socket instance
const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'], // Use WebSocket transport
});

export default socket;