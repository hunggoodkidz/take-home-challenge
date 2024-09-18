import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationToast: React.FC = () => {
  // Example of how to trigger a notification
  const notify = () => toast("This is a notification!");

  return (
    <>
      <button onClick={notify} className="p-2 bg-blue-500 text-white rounded">Show Notification</button>
      <ToastContainer />
    </>
  );
};

export default NotificationToast;
