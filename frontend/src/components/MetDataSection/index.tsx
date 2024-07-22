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
          The India Water Portal serves as a treasure of information, housing meteorological datasets for all districts of India
          spanning over the 20th Century `(1901-2002)`. This rich resource, encompassing 13 crucial climate parameters, offers 
          invaluable insights for researchers, water resource managers, and anyone interested in understanding India &apos; s 
          water story. This data can be useful in making rainwater harvesting and water balance estimates, in various research 
          areas, climate change adaptation studies and more.
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
          The meteorological data from the India Water Portal is currently stored in CSV files.
          </p>
        </div>
      </div>
    </main>
  );
}