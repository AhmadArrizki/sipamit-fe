import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function DataBarang() {
  const navigate = useNavigate();

  // Ambil token dari cookies
  const authToken = Cookies.get('authToken');

  const items = [
    { name: "CCTV", description: "List data untuk CCTV", path: "/dashboard/cctv" }, // Ganti path di sini
    { name: "Komputer PH 1", description: "List data untuk Komputer PH 1", path: "/dashboard/komputer-ph1" },
    { name: "Komputer PH 2", description: "List data untuk Komputer PH 2", path: "/dashboard/komputer-ph2" },
    { name: "Fingerprint", description: "List data untuk Fingerprint", path: "/dashboard/fingerprint" },
    { name: "Printer", description: "List data untuk Printer", path: "/dashboard/printer" },
    { name: "Telepon", description: "List data untuk Telepon", path: "/dashboard/telepon" },
    { name: "TOA", description: "List data untuk TOA", path: "/dashboard/toa" },
    { name: "UPS", description: "List data untuk UPS", path: "/dashboard/ups" },
  ];

  const handleCardClick = (path) => {
    console.log("Navigating to:", path); // Debugging
    console.log("authToken:", authToken); // Debugging untuk melihat token

    if (authToken) { // Cek apakah token ada
      navigate(path); // Navigasi ke halaman sesuai path
    } else {
      alert("Anda perlu login untuk mengakses halaman ini. Klik OK untuk login.");
      navigate("/sign-in"); // Arahkan pengguna ke halaman login
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <div className="mx-3 -mt-16 mb-6 lg:mx-4">
        <div className="grid grid-cols-1 gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.name} onClick={() => handleCardClick(item.path)} className="cursor-pointer">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardBody className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DataBarang;
