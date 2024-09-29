import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    socket.on('device-down', (data) => {
      setNotifications((prev) => [...prev, `Device ${data.deviceName} is down!`]);
    });

    return () => {
      socket.off('device-down');
    };
  }, []);

  return (
    <div>
      {notifications.map((message, index) => (
        <div key={index} className="notification">
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notification;