import apiClient from '../utils/api';

export const getNodes = async () => {
  try {
    const response = await apiClient.get('/nodes');
    return response.data;
  } catch (error) {
    console.error('Error fetching nodes:', error);
    throw error;
  }
};

export const getNodeById = async (id: number) => {
  try {
    const response = await apiClient.get(`/nodes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching node:', error);
    throw error;
  }
};

export const createNode = async (nodeData: any) => {
  try {
    const response = await apiClient.post('/nodes', nodeData);
    return response.data;
  } catch (error) {
    console.error('Error creating node:', error);
    throw error;
  }
};

export const updateNode = async (id: number, nodeData: any) => {
  try {
    const response = await apiClient.put(`/nodes/${id}`, nodeData);
    return response.data;
  } catch (error) {
    console.error('Error updating node:', error);
    throw error;
  }
};

export const deleteNode = async (id: number) => {
  try {
    const response = await apiClient.delete(`/nodes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting node:', error);
    throw error;
  }
};
