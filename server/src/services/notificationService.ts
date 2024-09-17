import prisma from '../db/prisma';

export const createNotification = async (message: string, nodeId: number) => {
  return prisma.notification.create({
    data: {
      message,
      node: { connect: { id: nodeId } }
    }
  });
};

export const getNotifications = async () => {
  return prisma.notification.findMany();
};

export const getNotificationById = async (id: number) => {
  return prisma.notification.findUnique({
    where: { id }
  });
};

export const updateNotification = async (id: number, message: string) => {
  return prisma.notification.update({
    where: { id },
    data: { message }
  });
};

export const deleteNotification = async (id: number) => {
  return prisma.notification.delete({
    where: { id }
  });
};