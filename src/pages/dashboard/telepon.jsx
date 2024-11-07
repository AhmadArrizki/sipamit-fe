import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid"; // Importing PlusIcon, TrashIcon, and PencilIcon from Heroicons

export function Telepon() {
  const [teleponData, setTeleponData] = useState([]); // State to hold telepon data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTeleponData = async () => {
      const authToken = Cookies.get("authToken"); // Retrieve token from cookies

      try {
        const response = await fetch("http://localhost:5051/api/telepons", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`, // Set the token in the header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTeleponData(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchTeleponData();
  }, []); // Empty dependency array to run once on mount

  const handleAddClick = () => {
    navigate("/dashboard/addtelepon"); // Navigate to Add Telepon page
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/edittelepon/${id}`); // Navigate to Edit Telepon page with ID
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken"); // Retrieve token from cookies

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/telepon/${id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`, // Set the token in the header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Filter out the deleted item from the state
        setTeleponData(teleponData.filter((telepon) => telepon._id !== id));
      } catch (err) {
        setError(err.message); // Handle errors
      }
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter telepon data based on search query
  const filteredTeleponData = teleponData.filter((telepon) => {
    const searchLower = searchQuery.toLowerCase(); // Convert search query to lower case
    return (
      telepon.lokasi.toLowerCase().includes(searchLower) ||
      telepon.departemen.toLowerCase().includes(searchLower) ||
      telepon.user.toLowerCase().includes(searchLower) ||
      telepon.ext.toLowerCase().includes(searchLower) ||
      telepon.merk.toLowerCase().includes(searchLower) ||
      telepon.tipe.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List Telepon</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Cari Telepon..."
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
            <th className="py-2 px-4 border-b">Lokasi</th>
            <th className="py-2 px-4 border-b">Departemen</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Ext</th>
            <th className="py-2 px-4 border-b">Merk</th>
            <th className="py-2 px-4 border-b">Tipe</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeleponData.map((telepon, index) => (
            <tr key={telepon._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{telepon.lokasi}</td>
              <td className="py-2 px-4 border-b">{telepon.departemen}</td>
              <td className="py-2 px-4 border-b">{telepon.user}</td>
              <td className="py-2 px-4 border-b">{telepon.ext}</td>
              <td className="py-2 px-4 border-b">{telepon.merk}</td>
              <td className="py-2 px-4 border-b">{telepon.tipe}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditClick(telepon._id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(telepon._id)}
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

export default Telepon;
