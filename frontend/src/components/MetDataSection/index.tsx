"use client"

import Link from "next/link";

export default function MetDataSection() {
  return (
    <main className="lg:my-10 bg-[#067A91]">
      <div className="flex flex-col justify-center items-center text-white m-4 lg:mt-20">
        <section className="text-center sm:px-16 xl:px-48">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-normal text-white md:text-4xl lg:text-4xl">
            Met Data
          </h1>
          <p className="mb-6 text-justify font-normal text-white lg:text-xl leading-7">
            The India Water Portal serves as a treasure of information, housing meteorological datasets for all districts of India
            spanning over the 20th Century (1901-2002). This rich resource, encompassing 13 crucial climate parameters, offers 
            invaluable insights for researchers, water resource managers, and anyone interested in understanding India&apos;s 
            water story. This data can be useful in making rainwater harvesting and water balance estimates, in various research 
            areas, climate change adaptation studies, and more.
          </p>
        </section>
        <section className="text-center sm:px-16 xl:px-48">
          <h2 className="mb-4 text-xl font-semibold leading-none tracking-normal text-center text-white md:text-2xl lg:text-3xl">
            Source of Data
          </h2>
          <p className="mb-6 text-center font-normal text-white lg:text-xl">
            India Water Portal, Tyndall Centre for Climate Change Research
          </p>
        </section>
        <section className="text-center sm:px-16 xl:px-48">
          <h2 className="mb-4 text-xl font-semibold leading-none tracking-normal text-center text-white md:text-2xl lg:text-3xl">
            Background of Data
          </h2>
          <p className="mb-6 text-center font-normal text-white lg:text-xl">
            <Link
              href="https://www.indiawaterportal.org/articles/background-meteorological-datasets"
              className="hover:text-arghyam"
            >
              Background on the Meteorological Dataset
            </Link>
          </p>
        </section>
        <section className="text-center sm:px-16 xl:px-48">
          <h2 className="mb-4 text-xl font-semibold leading-none tracking-normal text-center text-white md:text-2xl lg:text-3xl">
            Data Format
          </h2>
          <p className="mb-6 text-center font-normal text-white lg:text-xl">
            The meteorological data from the India Water Portal is currently stored in CSV files.
          </p>
        </section>
      </div>
    </main>
  );
}