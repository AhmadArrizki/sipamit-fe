import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export function CCTV() {
  const [cctvs, setCctvs] = useState([]); // State untuk data CCTV
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [error, setError] = useState(null); // State untuk menampilkan pesan error
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchCctvs = async () => {
      const authToken = Cookies.get("authToken"); // Ambil token dari cookies

      try {
        const response = await fetch("http://localhost:5051/api/cctvs", {
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
        setCctvs(data); // Update state dengan data yang diambil
      } catch (err) {
        setError(err.message); // Tampilkan pesan error
      }
    };

    fetchCctvs();
  }, []);

  // Fungsi untuk navigasi ke halaman tambah
  const handleAddClick = () => {
    navigate("/dashboard/addcctv");
  };

  // Fungsi untuk navigasi ke halaman edit berdasarkan ID CCTV
  const handleEditClick = (id) => {
    navigate(`/dashboard/editcctv/${id}`);
  };

  // Fungsi untuk menghapus CCTV berdasarkan ID
  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken");

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/cctv/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Hapus item dari state setelah penghapusan berhasil
        setCctvs(cctvs.filter((cctv) => cctv._id !== id));
      } catch (err) {
        setError(err.message); // Tampilkan pesan error jika ada
      }
    }
  };

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update state dengan query pencarian
  };

  // Filter data CCTV berdasarkan query pencarian
  const filteredCctvs = cctvs.filter((cctv) => {
    const searchLower = searchQuery.toLowerCase(); // Konversi query pencarian ke huruf kecil
    return (
      cctv.nama.toLowerCase().includes(searchLower) ||
      cctv.lokasi.toLowerCase().includes(searchLower) ||
      cctv.kode.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List CCTV</h1>
        <div className="flex items-center space-x-2"> {/* Flex untuk pencarian */}
          <input
            type="text"
            placeholder="Cari CCTV..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded p-2"
          >
            <PlusIcon className="w-5 h-5" /> {/* Tombol tambah */}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Tampilkan pesan error jika ada */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Lokasi</th>
            <th className="py-2 px-4 border-b">Kode</th>
            <th className="py-2 px-4 border-b">Aksi</th> {/* Kolom untuk aksi */}
          </tr>
        </thead>
        <tbody>
          {filteredCctvs.map((cctv, index) => (
            <tr key={cctv._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{cctv.nama}</td>
              <td className="py-2 px-4 border-b">{cctv.lokasi}</td>
              <td className="py-2 px-4 border-b">{cctv.kode}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditClick(cctv._id)} // Panggil fungsi edit
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" /> {/* Icon edit */}
                </button>
                <button
                  onClick={() => handleDelete(cctv._id)} // Panggil fungsi hapus
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" /> {/* Icon hapus */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CCTV;
