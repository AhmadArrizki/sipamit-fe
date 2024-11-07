import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export function TOA() {
  const [toas, setToas] = useState([]); // State untuk menyimpan data TOA
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
  const [error, setError] = useState(null); // State untuk error handling
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToas = async () => {
      const authToken = Cookies.get("authToken"); // Mendapatkan token dari cookies

      try {
        const response = await fetch("http://localhost:5051/api/toas", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`, // Menyertakan token dalam header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setToas(data); // Update state dengan data yang di-fetch
      } catch (err) {
        setError(err.message); // Menangani error
      }
    };

    fetchToas();
  }, []);

  const handleAddClick = () => {
    navigate("/dashboard/addtoa"); // Navigasi ke halaman tambah TOA
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/edittoa/${id}`); // Navigasi ke halaman edit TOA dengan ID tertentu
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken");

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/toa/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setToas(toas.filter((toa) => toa._id !== id)); // Hapus item dari state
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update query pencarian
  };

  const filteredToas = toas.filter((toa) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      toa.nama.toLowerCase().includes(searchLower) ||
      toa.lokasi.toLowerCase().includes(searchLower) ||
      toa.kode.toLowerCase().includes(searchLower) ||
      toa.posisi.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List TOA</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Cari TOA..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded p-2"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Lokasi</th>
            <th className="py-2 px-4 border-b">Kode</th>
            <th className="py-2 px-4 border-b">Posisi</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredToas.map((toa, index) => (
            <tr key={toa._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{toa.nama}</td>
              <td className="py-2 px-4 border-b">{toa.lokasi}</td>
              <td className="py-2 px-4 border-b">{toa.kode}</td>
              <td className="py-2 px-4 border-b">{toa.posisi}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditClick(toa._id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(toa._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TOA;
