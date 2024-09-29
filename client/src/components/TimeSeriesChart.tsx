import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import socket from '../services/socket'; // Import your WebSocket client

// Register the required components in Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

type TimeSeriesChartProps = {
  deviceId: number; // deviceId prop to filter data
};

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ deviceId }) => {
  const [dataPoints, setDataPoints] = useState<{ timestamp: Date; value: number; nodeId: number; nodeName: string }[]>([]);

  useEffect(() => {
    // Listen for real-time data from the backend
    socket.on('device-data', (newDataPoints: any[]) => {
      // Filter data points based on deviceId and include nodeId and nodeName
      const filteredDataPoints = newDataPoints
        .filter(dataPoint => dataPoint.deviceId === deviceId)
        .map(dp => ({
          timestamp: new Date(dp.timestamp),
          value: dp.value,
          nodeId: dp.nodeId,   // NodeId for grouping
          nodeName: dp.nodeName,  // NodeName for labels
        }));

      setDataPoints((prevDataPoints) => [
        ...prevDataPoints.slice(-20), // Keep only the last 20 data points for the chart
        ...filteredDataPoints
      ]);
    });

    // Cleanup the listener when component unmounts
    return () => {
      socket.off('device-data');
    };
  }, [deviceId]);

  // Group data points by NodeId
  const groupedByNode = dataPoints.reduce((acc: any, dp) => {
    if (!acc[dp.nodeId]) {
      acc[dp.nodeId] = { label: dp.nodeName, data: [] };
    }
    acc[dp.nodeId].data.push(dp);
    return acc;
  }, {});

  // Prepare datasets for each node
  const datasets = Object.keys(groupedByNode).map(nodeId => ({
    label: `${groupedByNode[nodeId].label}`,  // Node label
    data: groupedByNode[nodeId].data.map((dp: any) => dp.value),
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,  // Random color for each line
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderWidth: 2,
    fill: true,
    tension: 0.4, // Smoothing out the curve of the chart
    pointRadius: 0, // Removes points from the line
  }));

  // Prepare labels based on the timestamp of the first node group
  const labels = (groupedByNode[Object.keys(groupedByNode)[0]]?.data || []).map((dp: any) => dp.timestamp.toLocaleTimeString());

  // Chart.js data structure
  const chartData = {
    labels: labels, // X-axis: time labels
    datasets: datasets, // Multiple datasets for each node
  };

  return (
    <div className="time-series-chart-container">
      <Line data={chartData} />
    </div>
  );
};

export default TimeSeriesChart;
