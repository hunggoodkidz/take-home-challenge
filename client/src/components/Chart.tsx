import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  data: Array<{ timestamp: string, value: number }>;
  deviceName: string;
}

const TimeSeriesChart: React.FC<ChartProps> = ({ data = [], deviceName }) => {
  const chartData = {
    labels: Array.isArray(data) ? data.map((point) => new Date(point.timestamp).toLocaleTimeString()) : [],
    datasets: [
      {
        label: deviceName,
        data: Array.isArray(data) ? data.map((point) => point.value) : [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TimeSeriesChart;
