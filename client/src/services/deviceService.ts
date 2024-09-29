import apiClient from '../utils/api';

// Fetch all devices
export const getDevices = async () => {
  try {
    const response = await apiClient.get('/devices');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

// Fetch device by ID
export const getDeviceById = async (deviceId: number) => {
  try {
    const response = await apiClient.get(`/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching device:', error);
    throw error;
  }
};

// Create a new device
export const createDevice = async (deviceData: any) => {
  try {
    const response = await apiClient.post('/devices', deviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating device:', error);
    throw error;
  }
};

// Delete a device
export const deleteDevice = async (deviceId: number) => {
  try {
    const response = await apiClient.delete(`/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};


// Fetch devices with node count
export const getDevicesWithNodeCount = async () => {
  try {
    const response = await apiClient.get('/devices/with-node-count');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices with node count:', error);
    throw error;
  }
};

// Fetch devices with data point count
export const getDevicesWithDataPointCount = async () => {
  try {
    const response = await apiClient.get('/devices/with-data-point-count');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices with data point count:', error);
    throw error;
  }
};