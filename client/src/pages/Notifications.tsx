import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const notify = useCallback(() => {
    if (message) {
      toast.info(message);
      setMessage('');
    }
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="mt-4">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter a notification message"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={notify}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show Notification
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;