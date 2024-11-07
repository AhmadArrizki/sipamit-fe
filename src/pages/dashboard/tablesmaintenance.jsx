import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function TablesMaintenance() {
  const navigate = useNavigate();

  // Get token from cookies
  const authToken = Cookies.get('authToken');

  const maintenanceItems = [
    { name: "CCTV Maintenance", description: "Maintenance tasks for CCTV", path: "/dashboard/maintenance-cctv" },
    { name: "Komputer PH 1 Maintenance", description: "Maintenance tasks for Komputer PH 1", path: "/dashboard/maintenance-komputer-ph1" },
    { name: "Komputer PH 2 Maintenance", description: "Maintenance tasks for Komputer PH 2", path: "/dashboard/maintenance-komputer-ph2" },
    { name: "Fingerprint Maintenance", description: "Maintenance tasks for Fingerprint", path: "/dashboard/maintenance-fingerprint" },
    { name: "Printer Maintenance", description: "Maintenance tasks for Printer", path: "/dashboard/maintenance-printer" },
    { name: "Telepon Maintenance", description: "Maintenance tasks for Telepon", path: "/dashboard/maintenance-telepon" },
    { name: "TOA Maintenance", description: "Maintenance tasks for TOA", path: "/dashboard/maintenance-toa" },
    { name: "UPS Maintenance", description: "Maintenance tasks for UPS", path: "/dashboard/maintenance-ups" },
  ];

  const handleCardClick = (path) => {
    console.log("Navigating to:", path); // Debugging
    console.log("authToken:", authToken); // Debugging to see token

    if (authToken) { // Check if token exists
      navigate(path); // Navigate to the page based on path
    } else {
      alert("Anda perlu login untuk mengakses halaman ini. Klik OK untuk login.");
      navigate("/sign-in"); // Redirect user to login page
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-black">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <div className="mx-3 -mt-16 mb-6 lg:mx-4">
        <div className="grid grid-cols-1 gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
          {maintenanceItems.map((item) => (
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

export default TablesMaintenance;
