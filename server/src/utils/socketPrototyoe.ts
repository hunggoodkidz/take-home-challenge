import { Server } from 'socket.io';

// Simulated device data (this can later be fetched from the database if needed)
let deviceData = [
  { id: 1, name: 'Device A', value: 0 },
  { id: 2, name: 'Device B', value: 0 },
  { id: 3, name: 'Device C', value: 0 },
];

// Function to initialize Socket.io
export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins (you may restrict in production)
      methods: ['GET', 'POST'],
    },
  });

  // Simulate real-time data
  setInterval(() => {
    deviceData = deviceData.map((device) => ({
      ...device,
      value: Math.floor(Math.random() * 100), // Simulate random data
    }));

    // Emit updated device data to all connected clients
    io.emit('device-data', deviceData);
  }, 3000); // Update every 3 seconds

  // Handle Socket.io connections
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send current device data to the newly connected client
    socket.emit('device-data', deviceData);

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
};
