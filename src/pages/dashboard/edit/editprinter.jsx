import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

const EditPrinter = () => {
  const { id } = useParams(); // Get the printer ID from the URL
  const [formData, setFormData] = useState({
    departemen: "",
    nama: "",
    no_seri: "",
    tipe_printer: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchPrinterData = async () => {
      const authToken = Cookies.get("authToken"); // Retrieve token from cookies

      try {
        const response = await fetch(`http://localhost:5051/api/printer/${id}`, {
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
          departemen: data.departemen,
          nama: data.nama,
          no_seri: data.no_seri,
          tipe_printer: data.tipe_printer,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrinterData();
  }, [id]); // Fetch data only when the component mounts or id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken"); // Retrieve token from cookies

    try {
      const response = await fetch(`http://localhost:5051/api/printer/${id}`, {
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
      setSuccess(`Printer berhasil diupdate: ${data.nama}`);
      setFormData({ departemen: "", nama: "", no_seri: "", tipe_printer: "" }); // Reset form
      navigate("/dashboard/printer"); // Navigate back to the printer list after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">Edit Printer</h1>
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
          Update Printer
        </button>
      </form>
    </div>
  );
};

export default EditPrinter;
