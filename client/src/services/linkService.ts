import apiClient from '../utils/api';

export const getLinks = async () => {
  try {
    const response = await apiClient.get('/links');
    return response.data;
  } catch (error) {
    console.error('Error fetching links:', error);
    throw error;
  }
};

export const getLinkById = async (id: number) => {
  try {
    const response = await apiClient.get(`/links/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching link:', error);
    throw error;
  }
};

export const createLink = async (linkData: any) => {
  try {
    const response = await apiClient.post('/links', linkData);
    return response.data;
  } catch (error) {
    console.error('Error creating link:', error);
    throw error;
  }
};

export const updateLink = async (id: number, linkData: any) => {
  try {
    const response = await apiClient.put(`/links/${id}`, linkData);
    return response.data;
  } catch (error) {
    console.error('Error updating link:', error);
    throw error;
  }
};

export const deleteLink = async (id: number) => {
  try {
    const response = await apiClient.delete(`/links/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting link:', error);
    throw error;
  }
};
