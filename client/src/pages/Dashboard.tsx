import React, { useEffect, useState } from 'react';
import TimeSeriesChart from '../components/Chart';
import { getDataPoints } from '../services/dataPointService';

interface DataPoint {
  value: number;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [deviceData, setDeviceData] = useState<{ [deviceName: string]: DataPoint[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataPoints();
        console.log(data); // Verify that data is in the expected format
        setDeviceData(data);  // Update state with fetched data points
      } catch (error) {
        console.error('Error fetching data points:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Time-Series Dashboard</h2>
      <div>
        {Object.keys(deviceData).map((deviceName) => (
          <TimeSeriesChart key={deviceName} data={deviceData[deviceName] || []} deviceName={deviceName} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
