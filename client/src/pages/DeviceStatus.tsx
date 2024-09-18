import React, { useEffect, useState } from 'react';
import socket from '../services/socket';
import { toast } from 'react-toastify';

interface Device {
  id: string;
  status: string;
  // Add other fields if necessary
}

const DeviceStatus: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Handle incoming device status updates
    socket.on('deviceStatusUpdate', (updatedDevice: Device) => {
      setDevices((prevDevices) => {
        const deviceIndex = prevDevices.findIndex((d) => d.id === updatedDevice.id);
        if (deviceIndex >= 0) {
          // Update existing device
          const updatedDevices = [...prevDevices];
          updatedDevices[deviceIndex] = updatedDevice;
          toast.info(`Device ${updatedDevice.id} status updated: ${updatedDevice.status}`);
          return updatedDevices;
        } else {
          // Add new device
          toast.info(`New device ${updatedDevice.id} status: ${updatedDevice.status}`);
          return [...prevDevices, updatedDevice];
        }
      });
    });

    // Clean up on component unmount
    return () => {
      socket.off('deviceStatusUpdate');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Device Status</h1>
      <div className="mt-4">
        <ul>
          {devices.map((device) => (
            <li key={device.id} className="mb-2 p-2 border border-gray-300 rounded">
              <strong>Device ID:</strong> {device.id} <br />
              <strong>Status:</strong> {device.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceStatus;