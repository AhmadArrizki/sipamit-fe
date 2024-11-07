import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const MaintenanceCCTV = () => {
  const [devices, setDevices] = useState([]);
  const [checkpointData, setCheckpointData] = useState([]);
  const [checkpoint, setCheckpoint] = useState({
    keterangan: '',
    name: '',
  });
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [message, setMessage] = useState('');

  // Mengambil token dari cookies
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:5051/api/cctvs', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [authToken]);

  // Fungsi untuk mengambil data checkpoint
  const fetchCheckpoint = async () => {
    try {
      const response = await axios.get('http://localhost:5051/api/checkpoint/cctv', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCheckpointData(response.data);
      console.log('Checkpoint data:', response.data);
    } catch (error) {
      console.error('Error fetching checkpoint data:', error);
    }
  };

  useEffect(() => {
    fetchCheckpoint();
  }, [authToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      checkpoint: [
        {
          keterangan: checkpoint.keterangan,
          name: checkpoint.name,
        },
      ],
      device_id: selectedDeviceId,
    };

    try {
      await axios.post('http://localhost:5051/api/doc/cctv', postData, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setMessage('Maintenance data submitted successfully.');
    } catch (error) {
      console.error('Error submitting maintenance data:', error);
      setMessage('Failed to submit maintenance data.');
    }
  };

  const handleAddClick = () => {
    navigate('/dashboard/maintenance-list-cctv');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Maintenance CCTV</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block">Pilih Device:</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border p-2"
            required
          >
            <option value="">Pilih Device</option>
            {devices.map((device) => (
              <option key={device._id} value={device._id}>
                {device.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Keterangan:</label>
          <input
            type="text"
            value={checkpoint.keterangan}
            onChange={(e) => setCheckpoint({ ...checkpoint, keterangan: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Nama:</label>
          <input
            type="text"
            value={checkpoint.name}
            onChange={(e) => setCheckpoint({ ...checkpoint, name: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Kirim Data
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <button
        onClick={handleAddClick}
        className="mt-4 bg-green-500 text-white px-4 py-2"
      >
        Lihat Daftar Maintenance
      </button>
    </div>
  );
};

export default MaintenanceCCTV;
