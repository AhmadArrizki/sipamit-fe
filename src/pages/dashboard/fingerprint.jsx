import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid"; // Importing icons from Heroicons

export function Fingerprint() {
  const [fingerprints, setFingerprints] = useState([]); // State to hold Fingerprint data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFingerprints = async () => {
      const authToken = Cookies.get("authToken"); // Retrieve token from cookies

      try {
        const response = await fetch("http://localhost:5051/api/fingerprints", {
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
        setFingerprints(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchFingerprints();
  }, []); // Empty dependency array to run once on mount

  const handleAddClick = () => {
    navigate("/dashboard/addfingerprint"); // Navigate to Add Fingerprint page
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editfingerprint/${id}`); // Navigate to Edit Fingerprint page with ID
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken"); // Mengambil token dari cookies

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/fingerprint/${id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`, // Mengatur token di header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Menghapus item yang dihapus dari state
        setFingerprints(fingerprints.filter((fingerprint) => fingerprint._id !== id));
      } catch (err) {
        setError(err.message); // Menangani error
      }
    }
  };
  

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter Fingerprint data based on search query
  const filteredFingerprints = fingerprints.filter((fingerprint) => {
    const searchLower = searchQuery.toLowerCase(); // Convert search query to lower case
    return (
      fingerprint.nama.toLowerCase().includes(searchLower) ||
      fingerprint.lokasi.toLowerCase().includes(searchLower) ||
      fingerprint.kode.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List Fingerprints</h1> {/* Title remains displayed */}
        <div className="flex items-center space-x-2"> {/* Flex for spacing */}
          <input
            type="text"
            placeholder="Cari Fingerprint..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded p-2"
          >
            <PlusIcon className="w-5 h-5" /> {/* Plus icon */}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error if exists */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Lokasi</th>
            <th className="py-2 px-4 border-b">Kode</th>
            <th className="py-2 px-4 border-b">Aksi</th> {/* Column for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredFingerprints.map((fingerprint, index) => (
            <tr key={fingerprint._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{fingerprint.nama}</td>
              <td className="py-2 px-4 border-b">{fingerprint.lokasi}</td>
              <td className="py-2 px-4 border-b">{fingerprint.kode}</td>
              <td className="py-2 px-4 border-b flex space-x-2"> {/* Flex for spacing between buttons */}
                <button
                  onClick={() => handleEditClick(fingerprint._id)} // Call handleEditClick with fingerprint ID
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" /> {/* Edit icon */}
                </button>
                <button
                  onClick={() => handleDelete(fingerprint._id)} // Call handleDelete with fingerprint ID
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" /> {/* Trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fingerprint;
