import prisma from '../db/prisma';

// Ensure that you adjust the types and methods according to your schema
interface CreateDataPointInput {
  value: number;
  timestamp: Date;
  nodeId: number;
  deviceId: number; // Include deviceId if required
}

export const createDataPoint = async (input: CreateDataPointInput) => {
  return prisma.dataPoint.create({
    data: {
      value: input.value,
      timestamp: input.timestamp,
      node: { connect: { id: input.nodeId } },
      device: { connect: { id: input.deviceId } } // Connect the device if required
    }
  });
};

export const getDataPoints = async () => {
  return prisma.dataPoint.findMany();
};

export const getDataPointById = async (id: number) => {
  return prisma.dataPoint.findUnique({
    where: { id }
  });
};

export const updateDataPoint = async (id: number, input: CreateDataPointInput) => {
  return prisma.dataPoint.update({
    where: { id },
    data: {
      value: input.value,
      timestamp: input.timestamp,
      node: { connect: { id: input.nodeId } },
      device: { connect: { id: input.deviceId } } // Connect the device if required
    }
  });
};

export const deleteDataPoint = async (id: number) => {
  return prisma.dataPoint.delete({
    where: { id }
  });
};