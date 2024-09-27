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