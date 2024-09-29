import prisma from '../db/prisma'; // Adjust the path if necessary


// Get all devices
export const getAllDevices = async () => {
  return prisma.device.findMany();
};

// Get a device by ID
export const getDeviceById = async (id: number) => {
  return prisma.device.findUnique({
    where: { id },
  });
};

// Create a new device
export const createDevice = async (name: string, status: boolean) => {
    return await prisma.device.create({
      data: { name, status },
    });
  };

// Update a device
export const updateDevice = async (id: number, name?: string, status?: boolean) => {
    return await prisma.device.update({
      where: { id },
      data: { name, status },
    });
  };

// Delete a device
export const deleteDevice = async (id: number) => {
    return await prisma.device.delete({
      where: { id },
    });
  };

  // Create a new device and automatically create a linked pipeline
export const createDeviceWithPipeline = async (deviceData: { name: string; status: boolean }) => {
  return await prisma.device.create({
    data: {
      name: deviceData.name,
      status: deviceData.status,
      pipelines: {
        create: {
          name: `${deviceData.name} Pipeline`, // Auto-generate pipeline name
          description: `Pipeline for ${deviceData.name}`,
        },
      },
    },
    include: {
      pipelines: true, // Include the pipeline in the response
    },
  });
};

// Fetch devices with node count
export const getDevicesWithNodeCount = async () => {
  return await prisma.device.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      pipelines: {
        select: {
          _count: {
            select: {
              nodes: true, // Count nodes for each pipeline linked to this device
            },
          },
        },
      },
    },
  });
};

// Fetch devices with data point count
export const getDevicesWithDataPointCount = async () => {
  return await prisma.device.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      _count: {
        select: {
          dataPoints: true, // Count data points related to the device
        },
      },
    },
  });
};