import Chart from '../components/Chart';

const sampleData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Data Source 1',
      data: [10, 20, 30, 40, 50, 60],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'Data Source 2',
      data: [15, 25, 35, 45, 55, 65],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
  ],
};

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Chart data={sampleData} title="Time-Series Data Visualization" />
    </div>
  );
};

export default Dashboard;