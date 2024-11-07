import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function KomputerPH2() {
  const [komputers, setKomputers] = useState([]); // State untuk menyimpan data Komputer
  const [error, setError] = useState(null); // State untuk menangani error
  const navigate = useNavigate(); // Untuk navigasi

  useEffect(() => {
    fetchKomputers();
  }, []); // Panggil fetchKomputers saat komponen dimuat

  const fetchKomputers = async () => {
    const authToken = Cookies.get("authToken"); // Ambil token dari cookies

    try {
      const response = await fetch("http://localhost:5051/api/komputer-ph2s", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`, // Set token di header
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setKomputers(data); // Update state dengan data yang diambil
    } catch (err) {
      setError(err.message); // Tangani error
    }
  };

  const handleAddClick = () => {
    navigate("/dashboard/addkomputerph2"); // Navigasi ke halaman tambah komputer
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editkomputerph2/${id}`); // Navigasi ke halaman edit komputer
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken");

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/komputer-ph2/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setKomputers(komputers.filter((komputer) => komputer._id !== id)); // Update state setelah menghapus
      } catch (err) {
        setError(err.message); // Tangani error
      }
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">List Komputer PH2</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white rounded px-2 py-1 text-xs flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-1" /> Tambah Komputer
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Tampilkan error jika ada */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead>
            <tr>
              {["No", "Nama", "Merk", "PC", "Monitor", "CPU", "RAM", "Internal", "Lokasi", "Aksi"].map((header) => (
                <th key={header} className="py-1 px-1 border-b text-center">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {komputers.map((komputer, index) => (
              <tr key={komputer._id} className="hover:bg-gray-100">
                <td className="py-1 px-1 border-b text-center">{index + 1}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.nama}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.merk}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.pc}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.monitor}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.cpu}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.ram}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.internal}</td>
                <td className="py-1 px-1 border-b text-center">{komputer.lokasi}</td>
                <td className="py-1 px-1 border-b text-center flex justify-around">
                  <button
                    onClick={() => handleEditClick(komputer._id)}
                    className="text-green-500 hover:text-green-700 p-0.5"
                  >
                    <PencilIcon className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(komputer._id)}
                    className="text-red-500 hover:text-red-700 p-0.5"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KomputerPH2;
