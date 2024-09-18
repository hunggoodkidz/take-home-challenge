import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import PipelineBuilder from './pages/PipelineBuilder';
import DeviceStatus from './pages/DeviceStatus';
import Notifications from './pages/Notifications';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pipeline" element={<PipelineBuilder />} />
            <Route path="/devices" element={<DeviceStatus />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;