import React, { useState, useEffect } from 'react';
import { getDevices } from '../../services/deviceService';

interface Device {
  id: number;
  name: string;
  status: boolean;
}

interface DeviceSelectionProps {
  onSelectDevice: (deviceId: number) => void;
  refreshDevices: boolean; // Add this prop to trigger a refresh
}

const DeviceSelection: React.FC<DeviceSelectionProps> = ({ onSelectDevice, refreshDevices }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  useEffect(() => {
    fetchDevices(); // Fetch devices when the component mounts
  }, []);

  useEffect(() => {
    if (refreshDevices) {
      fetchDevices(); // Fetch devices again when `refreshDevices` changes
    }
  }, [refreshDevices]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = Number(event.target.value);
    setSelectedDevice(deviceId);
    onSelectDevice(deviceId); // Trigger the parent function to load pipeline data
  };

  return (
    <div>
      <label htmlFor="device-select" className="block mb-2">
        Select Device:
      </label>
      <select
        id="device-select"
        value={selectedDevice || ''}
        onChange={handleDeviceChange}
        className="border p-2 rounded"
      >
        <option value="" disabled>
          -- Select Device --
        </option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name} ({device.status ? 'Online' : 'Offline'})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeviceSelection;
