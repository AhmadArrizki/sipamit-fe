import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for getting URL params and useNavigate for navigation

const EditTelepon = () => {
  const { id } = useParams(); // Get the telephone ID from the URL
  const [formData, setFormData] = useState({
    departemen: "",
    ext: "",
    lokasi: "",
    merk: "",
    tipe: "",
    user: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTeleponData = async () => {
      const authToken = Cookies.get("authToken"); // Ambil token dari cookies

      try {
        const response = await fetch(`http://localhost:5051/api/telepon/${id}`, {
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
          ext: data.ext,
          lokasi: data.lokasi,
          merk: data.merk,
          tipe: data.tipe,
          user: data.user,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTeleponData();
  }, [id]); // Fetch data only when the component mounts or id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Ambil token dari cookies

    try {
      const response = await fetch(`http://localhost:5051/api/telepon/${id}`, {
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
      setSuccess(`Telepon berhasil diupdate: ${data.user}`);
      setFormData({ departemen: "", ext: "", lokasi: "", merk: "", tipe: "", user: "" }); // Reset form
      navigate("/dashboard/telepon"); // Navigate back to the telephone list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Edit Telepon</h1>
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
          <label className="block mb-1">Ext</label>
          <input
            type="text"
            name="ext"
            value={formData.ext}
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
        <div>
          <label className="block mb-1">User</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Update Telepon
        </button>
      </form>
    </div>
  );
};

export default EditTelepon;
