import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export function Printer() {
  const [printers, setPrinters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrinters = async () => {
      const authToken = Cookies.get("authToken");

      try {
        const response = await fetch("http://localhost:5051/api/printers", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPrinters(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrinters();
  }, []);

  const handleAddClick = () => {
    navigate("/dashboard/addprinter");
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/editprinter/${id}`);
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("authToken");

    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`http://localhost:5051/api/printer/${id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setPrinters(printers.filter((printer) => printer._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPrinters = printers.filter((printer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      printer.nama.toLowerCase().includes(searchLower) ||
      printer.departemen.toLowerCase().includes(searchLower) ||
      printer.tipe_printer.toLowerCase().includes(searchLower) ||
      printer.no_seri.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">List Printers</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Cari Printer..."
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
            <th className="py-2 px-4 border-b">Departemen</th>
            <th className="py-2 px-4 border-b">Tipe Printer</th>
            <th className="py-2 px-4 border-b">No Seri</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrinters.map((printer, index) => (
            <tr key={printer._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{printer.nama}</td>
              <td className="py-2 px-4 border-b">{printer.departemen}</td>
              <td className="py-2 px-4 border-b">{printer.tipe_printer}</td>
              <td className="py-2 px-4 border-b">{printer.no_seri}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditClick(printer._id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(printer._id)}
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

export default Printer;
