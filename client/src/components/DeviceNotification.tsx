import React, { useEffect, useState } from 'react';
import socket from '../services/socket'; // WebSocket client
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DeviceNotificationProps = {};

const DeviceNotification: React.FC<DeviceNotificationProps> = () => {
  const [downDevices, setDownDevices] = useState<Set<number>>(new Set()); // Keep track of down devices

  useEffect(() => {
    // Listen for 'device-down' events from the server
    socket.on('device-down', (data: { deviceId: number; message: string }) => {
      // Check if the device is already marked as down
      if (!downDevices.has(data.deviceId)) {
        toast.error(`🚨 ${data.message}`); // Show notification if the device goes down

        // Add the device to the set of down devices
        setDownDevices((prevDownDevices) => new Set(prevDownDevices.add(data.deviceId)));
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('device-down');
    };
  }, [downDevices]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default DeviceNotification;
