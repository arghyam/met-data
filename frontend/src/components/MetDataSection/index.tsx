"use client"

import Link from "next/link";

export default function MetDataSection() {
return (
    <main className="mb-10">
      <div className="justify-center items-center m-4 mt-10 lg:mt-20">
        <div className=" text-center sm:px-16 xl:px-48">
          <h1 className="mb-4  text-3xl font-extrabold leading-none tracking-normal text-gray-700 md:text-4xl lg:text-4xl ">
            Met Data
          </h1>
          <p className="mb-6 text-left font-normal text-gray-600 lg:text-xl   leading-7">
            Meteorological datasets for 13 climate parameters for all districts
            of India from 1901 to 2002. Climate parameters included are:
            Precipitation, Max, Min and Avg Temperature, Cloud cover, Vapour
            pressure, Wet-day frequency, Diurnal temperature range, Ground frost
            frequency, Reference crop evapotranspiration, Potential
            evapotranspiration. The source data is from CRU 2.1 dataset of
            Tyndall Centre for Climate Change Research.
          </p>
        </div>
        <div className=" text-left sm:px-16 xl:px-48">
          <h1 className="mb-4  text-xl font-semibold leading-none tracking-normal text-gray-700 md:text-2xl lg:text-3xl ">
            Source of Data
          </h1>
          <p className="mb-6 text-left font-normal text-gray-600 lg:text-xl  ">
            India Water Portal, Tyndall Centre for Climate Change Research
          </p>
        </div>
        <div className=" text-left sm:px-16 xl:px-48">
          <h1 className="mb-4  text-xl font-semibold leading-none tracking-normal text-gray-700 md:text-2xl lg:text-3xl ">
          Background of Data
          </h1>
          <p className="mb-6 text-left font-normal text-gray-600 lg:text-xl  ">
          <Link
              href="https://www.indiawaterportal.org/articles/background-meteorological-datasets"
              className="hover:text-arghyam"
            >
              Background on the Meteorological Dataset
            </Link>
          </p>
        </div>
        <div className=" text-left sm:px-16 xl:px-48">
          <h1 className="mb-4  text-xl font-semibold leading-none tracking-normal text-gray-700 md:text-2xl lg:text-3xl ">
            Data Format
          </h1>
          <p className="mb-6 text-left font-normal text-gray-600 lg:text-xl  ">
            Data is available in CSV format and charts to visualize
          </p>
        </div>
      </div>
    </main>
  );
}