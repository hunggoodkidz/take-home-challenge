import prisma from '../db/prisma';

export const createNode = async (name: string, type: string, position: object, pipelineId: number) => {
  return await prisma.node.create({
    data: {
      name,
      type,
      position,
      pipelineId,
    },
  });
};

export const getNodeById = async (id: number) => {
  return await prisma.node.findUnique({
    where: { id },
  });
};

export const getAllNodes = async () => {
  return await prisma.node.findMany();
};

export const updateNode = async (id: number, data: Partial<{ name: string; type: string; position: object; pipelineId: number }>) => {
  return await prisma.node.update({
    where: { id },
    data,
  });
};

export const deleteNode = async (id: number) => {
  return await prisma.node.delete({
    where: { id },
  });
};

export const getNodesByPipelineId = async (pipelineId: number) => {
  return prisma.node.findMany({
    where: {
      pipelineId: pipelineId, // Ensure only nodes with the specific pipelineId are returned
    },
  });
};
