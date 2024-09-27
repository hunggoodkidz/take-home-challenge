import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import socket from '../services/socket'; // Import socket instance
import 'chart.js/auto'; // Automatically import Chart.js

const Dashboard: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<any[]>([]);

  useEffect(() => {
    // Listen for real-time data points from the server
    socket.on('device-data', (newDataPoints) => {
      setDataPoints(newDataPoints);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('device-data');
    };
  }, []);

  const chartData = {
    labels: dataPoints.map((dp) => new Date(dp.timestamp).toLocaleTimeString()), // Convert timestamp to time
    datasets: [
      {
        label: 'Device Data',
        data: dataPoints.map((dp) => dp.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Real-Time Device Data</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;