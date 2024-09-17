import prisma from '../db/prisma';

export const createPipeline = async (name: string, description: string) => {
  return prisma.pipeline.create({
    data: {
      name,
      description
    }
  });
};

export const getPipelines = async () => {
  return prisma.pipeline.findMany();
};

export const getPipelineById = async (id: number) => {
  return prisma.pipeline.findUnique({
    where: { id }
  });
};

export const updatePipeline = async (id: number, name: string, description: string) => {
  return prisma.pipeline.update({
    where: { id },
    data: { name, description }
  });
};

export const deletePipeline = async (id: number) => {
  return prisma.pipeline.delete({
    where: { id }
  });
};