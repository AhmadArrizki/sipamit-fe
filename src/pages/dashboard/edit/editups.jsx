import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for getting URL params and useNavigate for navigation

const EditUPS = () => {
  const { id } = useParams(); // Get the UPS ID from the URL
  const [formData, setFormData] = useState({
    departemen: "",
    lokasi: "",
    nama: "",
    no_seri: "",
    tipe: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUPSData = async () => {
      const authToken = Cookies.get("authToken"); // Ambil token dari cookies

      try {
        const response = await fetch(`http://localhost:5051/api/ups/${id}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`, // Set token di header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFormData({
          departemen: data.departemen,
          lokasi: data.lokasi,
          nama: data.nama,
          no_seri: data.no_seri,
          tipe: data.tipe,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUPSData();
  }, [id]); // Fetch data only when the component mounts or id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Ambil token dari cookies

    try {
      const response = await fetch(`http://localhost:5051/api/ups/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${authToken}`, // Set token di header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess(`UPS berhasil diupdate: ${data.nama}`);
      setFormData({ departemen: "", lokasi: "", nama: "", no_seri: "", tipe: "" }); // Reset form
      navigate("/dashboard/ups"); // Navigate back to the UPS list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Edit UPS</h1>
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
          <label className="block mb-1">Tipe</label>
          <input
            type="text"
            name="tipe"
            value={formData.tipe}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Update UPS
        </button>
      </form>
    </div>
  );
};

export default EditUPS;
