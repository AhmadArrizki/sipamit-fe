import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for getting URL params and useNavigate for navigation

const EditTOA = () => {
  const { id } = useParams(); // Get the TOA ID from the URL
  const [formData, setFormData] = useState({
    kode: "",
    lokasi: "",
    nama: "",
    posisi: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTOAData = async () => {
      const authToken = Cookies.get("authToken"); // Retrieve token from cookies

      try {
        const response = await fetch(`http://localhost:5051/api/toa/${id}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`, // Set token in header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFormData({
          kode: data.kode,
          lokasi: data.lokasi,
          nama: data.nama,
          posisi: data.posisi,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTOAData();
  }, [id]); // Fetch data only when the component mounts or id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Retrieve token from cookies

    try {
      const response = await fetch(`http://localhost:5051/api/toa/${id}`, {
        method: "PUT",
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
      setSuccess(`TOA berhasil diupdate: ${data.nama}`);
      setFormData({ kode: "", lokasi: "", nama: "", posisi: "" }); // Reset form
      navigate("/dashboard/toa"); // Navigate back to the TOA list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Edit TOA</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Kode</label>
          <input
            type="text"
            name="kode"
            value={formData.kode}
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
          <label className="block mb-1">Posisi</label>
          <input
            type="text"
            name="posisi"
            value={formData.posisi}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Update TOA
        </button>
      </form>
    </div>
  );
};

export default EditTOA;
