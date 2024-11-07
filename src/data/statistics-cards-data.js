import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: ArchiveBoxIcon,
    title: "Total Barang",
    value: "", // Set as empty or "Loading..."
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Users",
    value: "2",
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "2",
  },
];

export default statisticsCardsData;
