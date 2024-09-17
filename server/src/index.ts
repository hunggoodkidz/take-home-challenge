import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerUi, swaggerDocument } from './swagger'; // Adjust the path if necessary

import deviceRoutes from './routes/deviceRoutes'; // Import device routes
import nodeRoutes from './routes/nodeRoutes'; // Import node routes
import linkRoutes from './routes/linkRoutes'; // Import link routes
import dataPointRoutes from './routes/dataPointRoutes'; // Import data point routes
import notificationRoutes from './routes/notificationRoutes'; //Import notification routes
import pipelineRoutes from './routes/pipelineRoutes'; //Import pipeline routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/devices', deviceRoutes); // Device routes
app.use('/api/nodes', nodeRoutes); // Node routes
app.use('/api/links', linkRoutes); // Link routes
app.use('/api/dataPoints', dataPointRoutes); // Use the data point routes
app.use('/api/notifications', notificationRoutes); // Notification routes
app.use('/api/pipelines', pipelineRoutes); // Pipeline routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});