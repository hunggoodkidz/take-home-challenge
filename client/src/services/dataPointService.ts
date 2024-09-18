import apiClient from '../utils/api';

export const getDataPoints = async () => {
  try {
    const response = await apiClient.get('/dataPoints');
    return response.data;
  } catch (error) {
    console.error('Error fetching data points:', error);
    throw error;
  }
};

export const getDataPointById = async (id: number) => {
  try {
    const response = await apiClient.get(`/dataPoints/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data point:', error);
    throw error;
  }
};

export const createDataPoint = async (dataPointData: any) => {
  try {
    const response = await apiClient.post('/dataPoints', dataPointData);
    return response.data;
  } catch (error) {
    console.error('Error creating data point:', error);
    throw error;
  }
};

export const updateDataPoint = async (id: number, dataPointData: any) => {
  try {
    const response = await apiClient.put(`/dataPoints/${id}`, dataPointData);
    return response.data;
  } catch (error) {
    console.error('Error updating data point:', error);
    throw error;
  }
};

export const deleteDataPoint = async (id: number) => {
  try {
    const response = await apiClient.delete(`/dataPoints/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data point:', error);
    throw error;
  }
};
