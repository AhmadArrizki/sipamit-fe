import React, { useEffect, useState } from "react";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData as initialStatisticsCardsData } from "@/data";
import Cookies from "js-cookie";

export function Home() {
  const [statisticsCardsData, setStatisticsCardsData] = useState(initialStatisticsCardsData);

  useEffect(() => {
    const fetchTotalDevices = async () => {
      const authToken = Cookies.get("authToken");
      try {
        const response = await fetch("http://localhost:5051/api/devices/total", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch total devices");
        }

        const data = await response.json();

        // Update statisticsCardsData with fetched total
        setStatisticsCardsData(prevData =>
          prevData.map(item =>
            item.title === "Total Barang"
              ? { ...item, value: data.totalDevices } // Set the API total value here
              : item
          )
        );
      } catch (error) {
        console.error("Error fetching total devices:", error);
      }
    };

    fetchTotalDevices();
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
