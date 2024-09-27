import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necessary components from Chart.js
import socket from '../services/socket'; // Import socket

const TimeSeriesChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [], // X-axis labels (timestamps)
    datasets: [], // Y-axis datasets (device values)
  });

  const [deviceData, setDeviceData] = useState<any[]>([]);

  useEffect(() => {
    // Listen for real-time 'device-data' events from the server
    socket.on('device-data', (data) => {
      setDeviceData(data);
    });

    return () => {
      socket.off('device-data');
    };
  }, []);

  useEffect(() => {
    if (deviceData.length > 0) {
      const currentTime = new Date().toLocaleTimeString();

      // Update the chart data with the new data from devices
      setChartData((prevData: any) => {
        const updatedLabels = [...prevData.labels, currentTime];

        const updatedDatasets = deviceData.map((device, index) => ({
          label: device.name,
          data: [...(prevData.datasets[index]?.data || []), device.value],
          fill: false,
          borderColor: getRandomColor(), // Random color for each dataset
          tension: 0.1,
        }));

        return {
          labels: updatedLabels,
          datasets: updatedDatasets,
        };
      });
    }
  }, [deviceData]);

  // Utility to generate random color for each device dataset
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Real-Time Device Data</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'second',
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TimeSeriesChart;
