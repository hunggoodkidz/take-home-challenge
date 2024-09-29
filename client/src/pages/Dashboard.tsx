import React, { useState } from 'react';
import DeviceCreationForm from '../components/device/DeviceCreationForm';
import DeviceSelection from '../components/device/DeviceSelection';
import PipelineFlow from '../components/PipelineFlow';
import TimeSeriesChart from '../components/TimeSeriesChart';
import DeviceNotification from '../components/DeviceNotification';

const Dashboard: React.FC = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [refreshDevices, setRefreshDevices] = useState(false); // Track when to refresh the devices

  const handleDeviceCreated = () => {
    setRefreshDevices(true); // Trigger a refresh when a new device is created
  };

  const handleDeviceSelected = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
    setRefreshDevices(false); // Stop refreshing once a device is selected
  };

  return (
    <>
      <DeviceNotification/>
      <div className="dashboard-container grid grid-cols-12 gap-4 p-4 h-full">
        {/* Sidebar (Device management, device creation) */}
        <div className="col-span-4 bg-white p-4 shadow-lg rounded-lg">
          <DeviceCreationForm onDeviceCreated={handleDeviceCreated} />
          <DeviceSelection onSelectDevice={handleDeviceSelected} refreshDevices={refreshDevices} />
        </div>

        {/* Pipeline Builder (Main content area) */}
        <div className="col-span-8 bg-white p-4 shadow-lg rounded-lg">
          {selectedDeviceId && <PipelineFlow deviceId={selectedDeviceId} />}
        </div>

        {/* Time-Series Chart (Full width below both sections) */}
        <div className="col-span-12 bg-white p-4 shadow-lg rounded-lg mt-4">
          {selectedDeviceId && <TimeSeriesChart deviceId={selectedDeviceId} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
