import React, { useState, useEffect } from 'react';
import PipelineFlow from '../components/PipelineFlow';
import { getDevices } from '../services/deviceService';

interface Device {
  id: number;
  name: string;
  status: boolean;
}

const PipelineBuilder: React.FC = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Fetch the list of devices when the component loads
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceSelected = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
  };

  return (
    <div className="pipeline-builder-container">
      <h1 className="text-2xl font-bold mb-4">Pipeline Builder</h1>

      {/* Device Selection */}
      <div className="device-selection-container mb-4">
        <label htmlFor="device-select" className="block mb-2 font-medium">Select Device:</label>
        <select
          id="device-select"
          value={selectedDeviceId || ''}
          onChange={(e) => handleDeviceSelected(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>-- Select Device --</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name} ({device.status ? 'Online' : 'Offline'})
            </option>
          ))}
        </select>
      </div>

      {/* Pipeline Flow */}
      <div className="pipeline-flow-container bg-white p-4 shadow-lg rounded-lg">
        {selectedDeviceId ? (
          <PipelineFlow deviceId={selectedDeviceId} />
        ) : (
          <div className="text-gray-500">Please select a device to build a pipeline.</div>
        )}
      </div>
    </div>
  );
};

export default PipelineBuilder;
