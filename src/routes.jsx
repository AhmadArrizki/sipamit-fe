import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";

import { Home, DataBarang, TablesMaintenance, CCTV, KomputerPH1, KomputerPH2, Fingerprint, Printer, Telepon, UPS, AddTOA, MaintenanceCCTV, CheckpointCCTV } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Cookies from 'js-cookie';

// Impor file yang telah dipindahkan ke subfolder
import TOA from "./pages/dashboard/toa";
import AddUPS from "./pages/dashboard/add/AddUPS";
import AddPrinter from "./pages/dashboard/add/AddPrinter";
import AddCCTV from "./pages/dashboard/add/AddCCTV";
import AddTelepon from "./pages/dashboard/add/AddTelepon";
import AddFingerprint from "./pages/dashboard/add/AddFingerprint";
import AddKomputerPH1 from "./pages/dashboard/add/AddKomputerPH1";
import AddKomputerPH2 from "./pages/dashboard/add/AddKomputerPH2";

import EditUPS from "./pages/dashboard/edit/EditUPS";
import EditCCTV from "./pages/dashboard/edit/EditCCTV";
import EditKomputerPH1 from "./pages/dashboard/edit/EditKomputerPH1";
import EditKomputerPH2 from "./pages/dashboard/edit/EditKomputerPH2";
import EditPrinter from "./pages/dashboard/edit/EditPrinter";
import EditFingerprint from "./pages/dashboard/edit/EditFingerprint";
import EditTelepon from "./pages/dashboard/edit/EditTelepon";
import EditTOA from "./pages/dashboard/edit/EditTOA";
import MaintenanceListCCTV from "./pages/dashboard/maintenance-list-cctv";

// Komponen PrivateRoute untuk proteksi rute
const PrivateRoute = ({ element }) => {
  const authToken = Cookies.get('authToken');
  return authToken ? element : <Navigate to="/sign-in" />;
}

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
        isVisible: true,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "Data Barang",
        path: "/databarang",
        element: <PrivateRoute element={<DataBarang />} />,
        isVisible: true,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Tables Maintenance",
        path: "/tablesmaintenance",
        element: <PrivateRoute element={<TablesMaintenance />} />,
        isVisible: true,
      },
      // Rute yang disembunyikan, seperti CCTV, Komputer, dll.
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "CCTV",
        path: "/cctv",
        element: <PrivateRoute element={<CCTV />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Fingerprint",
        path: "/fingerprint",
        element: <PrivateRoute element={<Fingerprint />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Printer",
        path: "/printer",
        element: <PrivateRoute element={<Printer />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Telepon",
        path: "/telepon",
        element: <PrivateRoute element={<Telepon />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "TOA",
        path: "/toa",
        element: <PrivateRoute element={<TOA />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "UPS",
        path: "/ups",
        element: <PrivateRoute element={<UPS />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Maintenance List CCTV",
        path: "/maintenance-list-cctv",
        element: <PrivateRoute element={<MaintenanceListCCTV />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Checkpoint CCTV",
        path: "/checkpoint-cctv/:id",
        element: <PrivateRoute element={<CheckpointCCTV />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Komputer PH1",
        path: "/komputer-ph1",
        element: <PrivateRoute element={<KomputerPH1 />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Komputer PH2",
        path: "/komputer-ph2",
        element: <PrivateRoute element={<KomputerPH2 />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Maintenance CCTV",
        path: "/maintenance-cctv",
        element: <PrivateRoute element={<MaintenanceCCTV />} />,
        isVisible: false,
      },
      // Tambahkan rute lain yang telah diatur ulang dengan path baru
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add TOA",
        path: "/addtoa",
        element: <PrivateRoute element={<AddTOA />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Printer",
        path: "/addprinter",
        element: <PrivateRoute element={<AddPrinter />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add UPS",
        path: "/addups",
        element: <PrivateRoute element={<AddUPS />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add TOA",
        path: "/addtoa",
        element: <PrivateRoute element={<AddTOA />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Komputer PH1",
        path: "/addkomputerph1",
        element: <PrivateRoute element={<AddKomputerPH1 />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add CCTV",
        path: "/addcctv",
        element: <PrivateRoute element={<AddCCTV />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Fingerprint",
        path: "/addfingerprint",
        element: <PrivateRoute element={<AddFingerprint />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Telepon",
        path: "/addtelepon",
        element: <PrivateRoute element={<AddTelepon />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Add Komputer PH2",
        path: "/addkomputerph2",
        element: <PrivateRoute element={<AddKomputerPH2 />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit UPS",
        path: "/editups/:id",
        element: <PrivateRoute element={<EditUPS />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit TOA",
        path: "/edittoa/:id",
        element: <PrivateRoute element={<EditTOA />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit CCTV",
        path: "/editcctv/:id",
        element: <PrivateRoute element={<EditCCTV />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit Fingerprint",
        path: "/editfingerprint/:id",
        element: <PrivateRoute element={<EditFingerprint />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit Telepon",
        path: "/edittelepon/:id",
        element: <PrivateRoute element={<EditTelepon />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit Printer",
        path: "/editprinter/:id",
        element: <PrivateRoute element={<EditPrinter />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit Komputer PH1",
        path: "/editkomputerph1/:id",
        element: <PrivateRoute element={<EditKomputerPH1 />} />,
        isVisible: false,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Edit Komputer PH2",
        path: "/editkomputerph2/:id",
        element: <PrivateRoute element={<EditKomputerPH2 />} />,
        isVisible: false,
      },
      // Tambahkan rute untuk komponen edit dan add lainnya
    ],
  },
  {
    title: "Auth Pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
        isVisible: true,
      },
    ],
  },
];

export default routes;
