import { Server } from 'socket.io';
import prisma from '../db/prisma';

// Keep track of device statuses to avoid repeated notifications
const deviceStatusMap = new Map<number, boolean>(); // Map to store device status (key: deviceId, value: status)

// Function to generate random data for each node
const generateRandomDataPoint = (nodeId: number, deviceId: number) => ({
  value: Math.random() * 100,  // Random value between 0-100
  timestamp: new Date(),       // Current timestamp
  nodeId,
  deviceId,
});

// Simulate device going down (50% chance every interval)
const simulateDeviceStatus = async (deviceId: number) => {
  const randomStatus = Math.random() > 0.5; // Randomly decide if the device is up or down
  await prisma.device.update({
    where: { id: deviceId },
    data: { status: randomStatus },
  });
  return randomStatus;
};

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
      // Fetch all nodes with their associated device from the pipeline
      const nodes = await prisma.node.findMany({
        include: {
          pipeline: {
            select: {
              deviceId: true,  // Get the deviceId from the pipeline
            },
          },
        },
      });

      // For each node, generate random data points
      const newDataPoints = nodes.map((node) => {
        const deviceId = node.pipeline.deviceId;
        return {
          ...generateRandomDataPoint(node.id, deviceId),
          nodeName: node.name,
        };
      });

      // Store the generated data points in the database
      await Promise.all(newDataPoints.map((dataPoint) => prisma.dataPoint.create({
        data: {
          value: dataPoint.value,
          timestamp: dataPoint.timestamp,
          nodeId: dataPoint.nodeId,
          deviceId: dataPoint.deviceId,
        },
      })));

      // Emit the new data points to all connected clients
      io.emit('device-data', newDataPoints);

      // Simulate checking the device status (up or down) every interval
      const deviceStatusPromises = nodes.map(async (node) => {
        const deviceId = node.pipeline.deviceId;
        const deviceStatus = await simulateDeviceStatus(deviceId);

        // Check the last known status of the device
        const lastKnownStatus = deviceStatusMap.get(deviceId);

        // If the device status has changed and is now down, emit the notification
        if (lastKnownStatus !== undefined && lastKnownStatus && !deviceStatus) {
          io.emit('device-down', { deviceId, message: `Device ${deviceId} is down!` });
        }

        // Update the status map with the current device status
        deviceStatusMap.set(deviceId, deviceStatus);
      });

      await Promise.all(deviceStatusPromises);

    } catch (error) {
      console.error('Error generating or storing data points:', error);
    }
  }, 3000); // Simulate every 3 seconds

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
