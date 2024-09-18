import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-300 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/pipeline-builder" className="block p-2 hover:bg-gray-300 rounded">Pipeline Builder</Link>
        </li>
        <li>
          <Link to="/device-status" className="block p-2 hover:bg-gray-300 rounded">Device Status</Link>
        </li>
        <li>
          <Link to="/notifications" className="block p-2 hover:bg-gray-300 rounded">Notifications</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
