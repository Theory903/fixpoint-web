import { GARAGE } from "@/types/garage";
import Image from "next/image";

const garageData: GARAGE[] = [
  {
    logo: "/images/garage/garage-01.svg",
    name: "Sai Motors",
    vehiclesServiced: 125,
    revenue: "₹3,45,000",
    sparePartsSold: 90,
    conversion: 4.5,
  },
  {
    logo: "/images/garage/garage-02.svg",
    name: "Sharma Garage",
    vehiclesServiced: 98,
    revenue: "₹2,80,000",
    sparePartsSold: 75,
    conversion: 4.2,
  },
  {
    logo: "/images/garage/garage-03.svg",
    name: "Kumar Auto Works",
    vehiclesServiced: 80,
    revenue: "₹2,10,000",
    sparePartsSold: 65,
    conversion: 3.9,
  },
  {
    logo: "/images/garage/garage-04.svg",
    name: "Delhi Car Care",
    vehiclesServiced: 72,
    revenue: "₹1,95,000",
    sparePartsSold: 60,
    conversion: 3.7,
  },
  {
    logo: "/images/garage/garage-05.svg",
    name: "Speed Motors",
    vehiclesServiced: 55,
    revenue: "₹1,25,000",
    sparePartsSold: 40,
    conversion: 3.2,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Top Garages
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Garage Name
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Vehicles Serviced
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenue (₹)
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Spare Parts Sold
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion Rate
            </h5>
          </div>
        </div>

        {garageData.map((garage, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === garageData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <Image src={garage.logo} alt="Garage Logo" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {garage.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {garage.vehiclesServiced}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">{garage.revenue}</p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {garage.sparePartsSold}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {garage.conversion}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
