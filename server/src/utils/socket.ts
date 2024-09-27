import { Server } from 'socket.io';
import { getLatestDataPoints } from '../services/dataPointService'; // Ensure this function exists and is correctly imported

// Function to initialize Socket.io
export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins (you can restrict this in production)
      methods: ['GET', 'POST'],
    },
  });

  // Simulate real-time data or fetch from database
  setInterval(async () => {
    const latestDataPoints = await getLatestDataPoints(); // Fetch the latest data from the database

    // Emit updated data to all connected clients
    io.emit('device-data', latestDataPoints);
  }, 3000); // Update every 3 seconds

  // Handle Socket.io connections
  io.on('connection', async (socket) => {
    console.log('A user connected:', socket.id);

    // Emit the latest data to the newly connected client
    const latestDataPoints = await getLatestDataPoints();
    socket.emit('device-data', latestDataPoints);

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
};
