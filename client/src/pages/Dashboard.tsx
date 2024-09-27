import React, { useState } from 'react';
import DeviceCreationForm from '../components/device/DeviceCreationForm';
import DeviceSelection from '../components/device/DeviceSelection';
import PipelineBuilder from '../components/PipelineFlow'; 
import TimeSeriesChart from '../components/TemporaryChart'; 

const Dashboard: React.FC = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const handleDeviceCreated = () => {
    // Refresh device selection on device creation
  };

  return (
    <div className="dashboard-container">
      <DeviceCreationForm onDeviceCreated={handleDeviceCreated} />
      <DeviceSelection onSelectDevice={setSelectedDeviceId} />

      {selectedDeviceId && (
        <>
          <PipelineBuilder deviceId={selectedDeviceId} />
          <TimeSeriesChart  />
        </>
      )}
    </div>
  );
};

export default Dashboard;
