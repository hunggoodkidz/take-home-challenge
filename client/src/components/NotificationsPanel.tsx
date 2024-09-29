// src/components/NotificationsPanel.tsx
import React from 'react';

const NotificationsPanel: React.FC = () => {
  return (
    <div className="absolute right-0 top-0 w-64 h-full bg-white p-4 shadow-lg z-50">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul>
        {/* Map through notifications and display */}
        <li className="mb-2">Device A is down</li>
        <li className="mb-2">Node B: High latency</li>
        <li className="mb-2">Pipeline 1 completed</li>
      </ul>
    </div>
  );
};

export default NotificationsPanel;
