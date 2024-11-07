import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AddKomputerPH2 = () => {
  const [formData, setFormData] = useState({
    cpu: "",
    internal: "",
    lokasi: "",
    merk: "",
    monitor: "",
    nama: "",
    pc: "",
    ram: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Get token from cookies

    try {
      const response = await fetch("http://localhost:5051/api/komputer-ph2", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${authToken}`, // Set token in header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess(`Komputer PH2 berhasil ditambahkan: ${data.nama}`);
      setFormData({ cpu: "", internal: "", lokasi: "", merk: "", monitor: "", nama: "", pc: "", ram: "" }); // Reset form
      navigate("/dashboard/komputer-ph2"); // Navigate back to the Komputer PH2 list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Tambah Komputer PH2</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block mb-1">Merk</label>
          <input
            type="text"
            name="merk"
            value={formData.merk}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">PC</label>
          <input
            type="text"
            name="pc"
            value={formData.pc}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Monitor</label>
          <input
            type="text"
            name="monitor"
            value={formData.monitor}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">CPU</label>
          <input
            type="text"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">RAM</label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Internal</label>
          <input
            type="text"
            name="internal"
            value={formData.internal}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Tambah Komputer PH2
        </button>
      </form>
    </div>
  );
};

export default AddKomputerPH2;
