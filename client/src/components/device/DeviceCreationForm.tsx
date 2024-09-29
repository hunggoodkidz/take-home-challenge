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
        setStatus(true);  // Reset the form fields

        onDeviceCreated(); // Notify the parent that a new device has been created
      } catch (error) {
        console.error('Error creating device:', error);
      }
    }
  };

  return (
    <div className="device-creation-form bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Device</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="Enter device name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="text-gray-700 mr-4">Status:</label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
            className="hidden"
          />
          <div className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 ${status ? 'bg-blue-500' : 'bg-gray-300'}`}>
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${status ? 'translate-x-4' : ''}`}
            />
          </div>
        </label>
        <span className="ml-2 text-gray-700">{status ? 'Online' : 'Offline'}</span>
      </div>

      <button
        onClick={handleCreateDevice}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Create Device
      </button>
    </div>
  );
};

export default DeviceCreationForm;
