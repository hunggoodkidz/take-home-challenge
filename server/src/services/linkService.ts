import prisma from '../db/prisma';

// Create a new link
export const createLink = async (sourceNodeId: number, targetNodeId: number) => {
    return await prisma.link.create({
        data: {
            sourceNodeId,
            targetNodeId
        }
    });
};

// Get all links
export const getLinks = async () => {
    return await prisma.link.findMany();
};

// Get a single link by ID
export const getLinkById = async (id: number) => {
    return await prisma.link.findUnique({
        where: { id }
    });
};

// Update a link by ID
export const updateLink = async (id: number, sourceNodeId: number, targetNodeId: number) => {
    return await prisma.link.update({
        where: { id },
        data: { sourceNodeId, targetNodeId }
    });
};

// Delete a link by ID
export const deleteLink = async (id: number) => {
    return await prisma.link.delete({
        where: { id }
    });
};
