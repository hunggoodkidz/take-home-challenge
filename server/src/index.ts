import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerUi, swaggerDocument } from './swagger';
import deviceRoutes from './routes/deviceRoutes';
import nodeRoutes from './routes/nodeRoutes';
import linkRoutes from './routes/linkRoutes';
import dataPointRoutes from './routes/dataPointRoutes';
import notificationRoutes from './routes/notificationRoutes';
import pipelineRoutes from './routes/pipelineRoutes';
import http from 'http';
import { initializeSocket } from './utils/socket'; // Import the socket service

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server for Express and Socket.io
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/nodes', nodeRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/dataPoints', dataPointRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/pipelines', pipelineRoutes);

// Initialize Socket.io
initializeSocket(server); // Call the socket initialization function

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
