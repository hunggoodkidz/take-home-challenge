import React, { useEffect, useState } from 'react';
import { getDevicesWithNodeCount, getDevicesWithDataPointCount } from '../services/deviceService';
import { ToastContainer } from 'react-toastify'; // Keep ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css';
import socket from '../services/socket'; // Import your socket service

interface Device {
  id: number;
  name: string;
  status: boolean;
  nodeCount: number;
  dataPointCount: number;
}

const DeviceStatus: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  // Fetch devices with both node count and data point count
  const fetchDeviceData = async () => {
    try {
      const devicesWithNodeCount = await getDevicesWithNodeCount();
      const devicesWithDataPointCount = await getDevicesWithDataPointCount();

      // Combine node count and data point count into each device object
      const combinedDevices = devicesWithNodeCount.map((device: any) => {
        const deviceWithDataPoints = devicesWithDataPointCount.find(
          (d: any) => d.id === device.id
        );
        return {
          id: device.id,
          name: device.name,
          status: device.status,
          nodeCount: device._count?.nodes || 0,
          dataPointCount: deviceWithDataPoints?._count?.dataPoints || 0,
        };
      });

      setDevices(combinedDevices);
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  useEffect(() => {
    fetchDeviceData();

    // You already have DeviceNotification handling device-down events, so no need to duplicate socket logic here

    return () => {
      socket.off('device-down'); // Clean up
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Device Status</h1>
      <h1>Still in development...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{device.name}</h2>
            <div className="flex items-center mb-2">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  device.status ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <span>{device.status ? 'Online' : 'Offline'}</span>
            </div>
            <p>Node Count: {device.nodeCount}</p>
            <p>Data Point Count: {device.dataPointCount}</p>
          </div>
        ))}
      </div>

      {/* Notification Toaster */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default DeviceStatus;
