import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid"; // Importing PlusIcon, TrashIcon, and PencilIcon from Heroicons

export function UPS() {
  const [upsData, setUpsData] = useState([]); // State to hold UPS data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUpsData = async () => {
      const authToken = Cookies.get("authToken"); // Retrieve token from cookies

      try {
        const response = await fetch("http://localhost:5051/api/ups", {
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
        setUpsData(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchUpsData();
  }, []); // Empty dependency array to run once on mount

  const handleAddClick = () => {
    navigate("/dashboard/addups"); // Navigate to Add UPS page
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editups/${id}`); // Navigate to Edit UPS page with ID
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken"); // Retrieve token from cookies

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/ups/${id}`, {
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
        setUpsData(upsData.filter((ups) => ups._id !== id));
      } catch (err) {
        setError(err.message); // Handle errors
      }
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter UPS data based on search query
  const filteredUpsData = upsData.filter((ups) => {
    const searchLower = searchQuery.toLowerCase(); // Convert search query to lower case
    return (
      ups.nama.toLowerCase().includes(searchLower) ||
      ups.departemen.toLowerCase().includes(searchLower) ||
      ups.tipe.toLowerCase().includes(searchLower) ||
      ups.no_seri.toLowerCase().includes(searchLower) ||
      ups.lokasi.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List UPS</h1> {/* Judul tetap ditampilkan */}
        <div className="flex items-center space-x-2"> {/* Flex for spacing */}
          <input
            type="text"
            placeholder="Cari UPS..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded p-2"
          >
            <PlusIcon className="w-5 h-5" /> {/* Icon plus */}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error if exists */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Departemen</th>
            <th className="py-2 px-4 border-b">Tipe</th>
            <th className="py-2 px-4 border-b">No Seri</th>
            <th className="py-2 px-4 border-b">Lokasi</th>
            <th className="py-2 px-4 border-b">Aksi</th> {/* Column for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredUpsData.map((ups, index) => (
            <tr key={ups._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{ups.nama}</td>
              <td className="py-2 px-4 border-b">{ups.departemen}</td>
              <td className="py-2 px-4 border-b">{ups.tipe}</td>
              <td className="py-2 px-4 border-b">{ups.no_seri}</td>
              <td className="py-2 px-4 border-b">{ups.lokasi}</td>
              <td className="py-2 px-4 border-b flex space-x-2"> {/* Flex for spacing between buttons */}
                <button
                  onClick={() => handleEditClick(ups._id)} // Call handleEditClick with ups ID
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" /> {/* Icon edit */}
                </button>
                <button
                  onClick={() => handleDelete(ups._id)} // Call handleDelete with ups ID
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" /> {/* Icon trash */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UPS;
