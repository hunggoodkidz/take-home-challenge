// src/pages/Dashboard.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { io } from 'socket.io-client';
import 'chart.js/auto'; // Automatically imports Chart.js

const socket = io('http://localhost:3000'); // Connect to backend Socket.io server

const Dashboard: React.FC = () => {
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Listen for device data stream
    socket.on('device-data', (data) => {
      setDeviceData(data); // Update device data
    });
  }, []);

  // Update chart data based on real-time updates
  useEffect(() => {
    if (deviceData.length > 0) {
      const newLabels = [...chartData.labels, new Date().toLocaleTimeString()];
      const datasets = deviceData.map((device) => ({
        label: device.name,
        data: [...(chartData.datasets.find(d => d.label === device.name)?.data || []), device.value],
        borderColor: getRandomColor(),
        fill: false,
      }));

      setChartData({
        labels: newLabels.slice(-10),  // Keep last 10 time points
        datasets,
      });
    }
  }, [deviceData]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h2>Time-Series Data Visualization</h2>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Value',
              },
              min: 0,
              max: 100,
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
