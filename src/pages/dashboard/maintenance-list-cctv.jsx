import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaCheckSquare, FaEye, FaTrash, FaPlus, FaPencilAlt } from 'react-icons/fa'; // Import ikon

const MaintenanceListCCTV = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const authToken = Cookies.get('authToken'); // Mengambil token dari cookies
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5051/api/doc/cctvs', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authToken}`, // Menggunakan Bearer authToken
          },
        });
        setMaintenanceData(response.data); // Mengatur data ke state
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      }
    };

    fetchMaintenanceData();
  }, [authToken]); // authToken sebagai dependency untuk menghindari perubahan token

  // Fungsi untuk navigasi ke halaman detail maintenance dengan ID spesifik
  const handleViewMaintenanceClick = (id) => {
    navigate(`/dashboard/view-maintenance-cctv/${id}`); // Mengarahkan ke view-maintenance-cctv
  };

  // Fungsi untuk navigasi ke halaman checkpoint dengan ID spesifik
  const handleCheckpointClick = (id) => {
    navigate(`/dashboard/checkpoint-cctv/${id}`);
  };

  // Fungsi untuk mengedit data maintenance berdasarkan ID
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-maintenance-cctv/${id}`); // Mengarahkan ke edit-maintenance-cctv
  };

  // Fungsi untuk menghapus data maintenance berdasarkan ID
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?'); // Konfirmasi penghapusan
    if (!confirmDelete) return; // Jika tidak dikonfirmasi, keluar dari fungsi

    try {
      await axios.delete(`http://localhost:5051/api/doc/cctv/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authToken}`, // Menggunakan Bearer authToken
        },
      });
      setMaintenanceData(maintenanceData.filter(item => item._id !== id)); // Menghapus item dari state
      alert('Data berhasil dihapus');
    } catch (error) {
      console.error('Error deleting maintenance data:', error);
      alert('Gagal menghapus data');
    }
  };

  // Fungsi untuk navigasi ke halaman maintenance CCTV
  const handleAddMaintenanceClick = () => {
    navigate('/dashboard/maintenance-cctv'); // Navigasi ke halaman maintenance CCTV
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Daftar Maintenance CCTV</h1>
      <div className="flex justify-end mb-4">
        {/* Tombol untuk menavigasi ke halaman maintenance CCTV */}
        <button
          onClick={handleAddMaintenanceClick}
          className="bg-blue-500 text-white px-2 py-2 flex items-center"
          title="Tambah Maintenance"
        >
          <FaPlus size={20} />
        </button>
      </div>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Lokasi</th>
            <th className="border px-4 py-2">Kode</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceData.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="border px-4 py-2">{item.nama}</td>
              <td className="border px-4 py-2">{item.lokasi}</td>
              <td className="border px-4 py-2">{item.kode}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
                {/* Tombol Edit dengan FaPencilAlt */}
                <button
                  onClick={() => handleEditClick(item._id)} // Navigasi ke edit-maintenance-cctv
                  className="text-yellow-500 hover:text-yellow-700"
                  title="Edit Data"
                >
                  <FaPencilAlt size={20} />
                </button>
                {/* Tombol View Maintenance */}
                <button
                  onClick={() => handleViewMaintenanceClick(item._id)} // Navigasi ke view-maintenance-cctv
                  className="text-blue-500 hover:text-blue-700"
                  title="View Maintenance"
                >
                  <FaEye size={20} />
                </button>
                {/* Tombol Checkpoint */}
                <button
                  onClick={() => handleCheckpointClick(item._id)}
                  className="text-green-500 hover:text-green-700"
                  title="Lihat Checkpoint"
                >
                  <FaCheckSquare size={20} />
                </button>
                {/* Tombol Delete */}
                <button
                  onClick={() => handleDeleteClick(item._id)} // Menghapus data berdasarkan ID
                  className="text-red-500 hover:text-red-700"
                  title="Hapus Data"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceListCCTV;
