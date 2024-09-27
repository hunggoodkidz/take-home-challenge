import apiClient from '../utils/api';

export const getPipelines = async () => {
  try {
    const response = await apiClient.get('/pipelines/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching pipelines:', error);
    throw error;
  }
};

export const getPipelineById = async (id: number) => {
  try {
    const response = await apiClient.get(`/pipelines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    throw error;
  }
};

export const createPipeline = async (pipelineData: any) => {
  try {
    const response = await apiClient.post('/pipelines', pipelineData);
    return response.data;
  } catch (error) {
    console.error('Error creating pipeline:', error);
    throw error;
  }
};

export const updatePipeline = async (id: number, pipelineData: any) => {
  try {
    const response = await apiClient.put(`/pipelines/${id}`, pipelineData);
    return response.data;
  } catch (error) {
    console.error('Error updating pipeline:', error);
    throw error;
  }
};

export const deletePipeline = async (id: number) => {
  try {
    const response = await apiClient.delete(`/pipelines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting pipeline:', error);
    throw error;
  }
};

// Fetch pipelines by device ID
export const getPipelinesByDeviceId = async (deviceId: number) => {
  try {
    const response = await apiClient.get(`/pipelines?deviceId=${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    throw error;
  }
};