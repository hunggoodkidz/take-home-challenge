import React, { useState } from 'react';
import { createDevice } from '../../services/deviceService';

interface DeviceCreationFormProps {
  onDeviceCreated: () => void;
}

const DeviceCreationForm: React.FC<DeviceCreationFormProps> = ({ onDeviceCreated }) => {
  const [deviceName, setDeviceName] = useState('');
  const [status, setStatus] = useState(true);

  const handleCreateDevice = async () => {
    if (deviceName) {
      try {
        await createDevice({ name: deviceName, status });
        setDeviceName('');
        onDeviceCreated(); // Refresh device list
      } catch (error) {
        console.error('Error creating device:', error);
      }
    }
  };

  return (
    <div className="device-creation-form">
      <input
        type="text"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        placeholder="Enter device name"
        className="p-2 border rounded"
      />
      <div className="flex items-center">
        <label>Status:</label>
        <input
          type="checkbox"
          checked={status}
          onChange={() => setStatus(!status)}
        />
        {status ? 'Online' : 'Offline'}
      </div>
      <button onClick={handleCreateDevice} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Create Device
      </button>
    </div>
  );
};

export default DeviceCreationForm;
