import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import socket from '../services/socket'; // Import the socket instance
import 'chart.js/auto'; // Automatically imports Chart.js components

const Dashboard: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<any[]>([]);

  useEffect(() => {
    // Listen for real-time data points from the server
    socket.on('device-data', (newDataPoints) => {
      setDataPoints((prevDataPoints) => {
        // Append the new data points and keep only the latest 10 for each device
        const updatedDataPoints = [...prevDataPoints, ...newDataPoints];

        // Limit the number of data points to avoid performance issues
        const uniqueData = updatedDataPoints
          .map((data) => ({
            ...data,
            timestamp: new Date(data.timestamp).toLocaleTimeString(), // Format timestamp for chart
          }))
          .slice(-10); // Keep only the last 10 data points

        return uniqueData;
      });
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('device-data');
    };
  }, []);

  // Prepare the chart data using the dataPoints
  const chartData = {
    labels: dataPoints.map((dp) => dp.timestamp), // Array of timestamps for X axis
    datasets: [
      {
        label: 'Device Data',
        data: dataPoints.map((dp) => dp.value), // Data values for Y axis
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for line
        fill: true, // Enable background fill below the line
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Real-Time Device Data</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time', // X-axis label
              },
            },
            y: {
              title: {
                display: true,
                text: 'Value', // Y-axis label
              },
              min: 0,
              max: 100, // Assuming device values range between 0 and 100
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
