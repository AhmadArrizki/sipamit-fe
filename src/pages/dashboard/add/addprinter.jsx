import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AddPrinter = () => {
  const [formData, setFormData] = useState({
    departemen: "",
    nama: "",
    no_seri: "",
    tipe_printer: "",
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");

    try {
      const response = await fetch("http://localhost:5051/api/printer", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess(`Printer berhasil ditambahkan: ${data.nama}`);
      setFormData({ departemen: "", nama: "", no_seri: "", tipe_printer: "" }); // Reset form
      navigate("/dashboard/printer"); // Navigate to printer list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Tambah Printer</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Departemen</label>
          <input
            type="text"
            name="departemen"
            value={formData.departemen}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">No Seri</label>
          <input
            type="text"
            name="no_seri"
            value={formData.no_seri}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Tipe Printer</label>
          <input
            type="text"
            name="tipe_printer"
            value={formData.tipe_printer}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Tambah Printer
        </button>
      </form>
    </div>
  );
};

export default AddPrinter;
