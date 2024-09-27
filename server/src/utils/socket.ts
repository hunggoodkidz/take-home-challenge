import { Server } from 'socket.io';
import prisma from '../db/prisma'; // Assuming you're using Prisma ORM

// Function to generate random data values for simulation purposes
const generateRandomDataPoint = (nodeId: number, deviceId: number) => ({
  value: Math.random() * 100,  // Random value between 0-100
  timestamp: new Date(),       // Current timestamp
  nodeId,
  deviceId,
});

export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins (you can restrict this in production)
      methods: ['GET', 'POST'],
    },
  });

  // Simulate data every 3 seconds
  setInterval(async () => {
    try {
      // Fetch all nodes and their associated pipelines and devices through DataPoints
      const nodes = await prisma.node.findMany({
        include: {
          dataPoints: true, // Include associated DataPoints to link the devices
        },
      });

      // For each node, generate random data points by getting the deviceId from the associated DataPoints
      const newDataPoints = nodes.map((node) => {
        // Assuming each node is linked to a deviceId via dataPoints, otherwise assign manually
        const deviceId = node.dataPoints[0]?.deviceId || 1; // Replace 1 with default device or fix your relations
        return generateRandomDataPoint(node.id, deviceId);
      });

      // Store the generated data points in the database (using Prisma)
      await Promise.all(newDataPoints.map((dataPoint) => prisma.dataPoint.create({
        data: dataPoint,
      })));

      // Emit the new data points to all connected clients
      io.emit('device-data', newDataPoints);

    } catch (error) {
      console.error('Error generating or storing data points:', error);
    }
  }, 100000); // Simulate every 3 seconds

  // Handle client connections
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send the latest data to the new connection
    prisma.dataPoint.findMany().then((latestDataPoints) => {
      socket.emit('device-data', latestDataPoints);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};
