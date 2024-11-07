import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

const EditKomputerPH1 = () => {
  const { id } = useParams(); // Get the Komputer PH1 ID from the URL
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

  useEffect(() => {
    const fetchKomputerData = async () => {
      const authToken = Cookies.get("authToken"); // Get token from cookies

      try {
        const response = await fetch(`http://localhost:5051/api/komputer-ph1/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`, // Set token in header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFormData({
          cpu: data.cpu,
          internal: data.internal,
          lokasi: data.lokasi,
          merk: data.merk,
          monitor: data.monitor,
          nama: data.nama,
          pc: data.pc,
          ram: data.ram,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchKomputerData();
  }, [id]); // Fetch data only when the component mounts or id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Get token from cookies

    try {
      const response = await fetch(`http://localhost:5051/api/komputer-ph1/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`, // Set token in header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess(`Komputer PH1 berhasil diupdate: ${data.nama}`);
      setFormData({
        cpu: "",
        internal: "",
        lokasi: "",
        merk: "",
        monitor: "",
        nama: "",
        pc: "",
        ram: "",
      }); // Reset form
      navigate("/dashboard/komputer-ph1"); // Navigate back to the Komputer PH1 list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Edit Komputer PH1</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["nama", "merk", "pc", "monitor", "cpu", "ram", "internal", "lokasi"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Update Komputer PH1
        </button>
      </form>
    </div>
  );
};

export default EditKomputerPH1;
