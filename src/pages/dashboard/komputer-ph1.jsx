import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function KomputerPH1() {
  const [komputers, setKomputers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
  const navigate = useNavigate();

  useEffect(() => {
    fetchKomputers();
  }, []);

  const fetchKomputers = async () => {
    const authToken = Cookies.get("authToken");

    try {
      const response = await fetch("http://localhost:5051/api/komputer-ph1s", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setKomputers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddClick = () => {
    navigate("/dashboard/addkomputerph1");
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editkomputerph1/${id}`);
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken");

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/komputer-ph1/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setKomputers(komputers.filter((komputer) => komputer._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update state untuk query pencarian
  };

  // Filter komputer berdasarkan query pencarian
  const filteredKomputers = komputers.filter((komputer) => {
    const searchLower = searchQuery.toLowerCase(); // Mengubah query pencarian menjadi huruf kecil
    return (
      komputer.nama.toLowerCase().includes(searchLower) ||
      komputer.merk.toLowerCase().includes(searchLower) ||
      komputer.pc.toLowerCase().includes(searchLower) ||
      komputer.monitor.toLowerCase().includes(searchLower) ||
      komputer.cpu.toLowerCase().includes(searchLower) ||
      komputer.ram.toLowerCase().includes(searchLower) ||
      komputer.internal.toLowerCase().includes(searchLower) ||
      komputer.lokasi.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">List Komputer PH1</h1>
        <div className="flex items-center space-x-2"> {/* Flex untuk input pencarian dan tombol tambah */}
          <input
            type="text"
            placeholder="Cari Komputer..."
            value={searchQuery}
            onChange={handleSearchChange} // Menangani perubahan input
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded px-2 py-1 text-xs flex items-center"
          >
            <PlusIcon className="w-4 h-4 mr-1" /> Tambah Komputer
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
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
            {filteredKomputers.map((komputer, index) => (
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

export default KomputerPH1;
