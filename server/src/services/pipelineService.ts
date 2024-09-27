import prisma from '../db/prisma'; // Assuming you're using Prisma ORM

// Function to create a new pipeline with an existing deviceId
export const createPipeline = async (name: string, description: string, deviceId: number) => {
  return prisma.pipeline.create({
    data: {
      name,
      description,
      deviceId, // Directly set the deviceId here, as device is represented via foreign key
    },
  });
};

// Function to fetch all pipelines
export const getPipelines = async () => {
  return prisma.pipeline.findMany({
    include: {
      device: true, // Include the related device
      nodes: true,  // Include the related nodes
    },
  });
};

// Function to fetch a specific pipeline by ID
export const getPipelineById = async (id: number) => {
  return prisma.pipeline.findUnique({
    where: { id },
    include: {
      device: true, // Include the related device
      nodes: true,  // Include the related nodes
    },
  });
};

// Function to update a pipeline
export const updatePipeline = async (id: number, name: string, description: string, deviceId: number) => {
  return prisma.pipeline.update({
    where: { id },
    data: {
      name,
      description,
      deviceId, // Set the deviceId when updating the pipeline
    },
  });
};

// Function to delete a pipeline
export const deletePipeline = async (id: number) => {
  return prisma.pipeline.delete({
    where: { id },
  });
};
