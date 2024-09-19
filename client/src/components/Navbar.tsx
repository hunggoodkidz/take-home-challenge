import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Dashboard</Link>
        <div>
          <Link to="/pipeline" className="mx-4 hover:underline">Pipeline Builder</Link>
          <Link to="/device" className="mx-4 hover:underline">Device Status</Link>
          <Link to="/notifications" className="mx-4 hover:underline">Notifications</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
