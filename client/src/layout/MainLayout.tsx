import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1 p-6 bg-white shadow-md rounded-lg mx-6 my-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
