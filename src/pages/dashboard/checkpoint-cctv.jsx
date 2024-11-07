import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CheckpointCCTV = () => {
  const [checkpointData, setCheckpointData] = useState(null);
  const authToken = Cookies.get('authToken');

  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const response = await axios.get('http://localhost:5051/api/checkpoint/cctv', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data) {
          setCheckpointData(response.data);
        } else {
          console.error('Data checkpoints is not valid:', response.data);
          setCheckpointData(null);
        }
      } catch (error) {
        console.error('Error fetching checkpoints:', error);
      }
    };

    fetchCheckpoints();
  }, [authToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkpoint CCTV</h1>
      {checkpointData ? (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2 text-left">Device</th>
              <th className="border px-4 py-2 text-left">Checkpoint</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr key={checkpointData._id} className="text-center border-b">
              <td className="border px-4 py-2">{checkpointData.device}</td>
              <td className="border px-4 py-2">
                <ul className="list-disc list-inside">
                  {checkpointData.checkpoint.map((item, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span className="text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2">
                {checkpointData.checkpoint.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <label className="flex items-center mr-4">
                      <input type="checkbox" name={`checkpoint-${checkpointData._id}-${index}-ok`} className="mr-1" />
                      OK
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name={`checkpoint-${checkpointData._id}-${index}-not-ok`} className="mr-1" />
                      NOT OK
                    </label>
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">{new Date(checkpointData.updated.at).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="mt-4">Loading or no checkpoint data available.</p>
      )}
    </div>
  );
};

export default CheckpointCCTV;
