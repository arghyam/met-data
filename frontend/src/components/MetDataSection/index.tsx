import coverImage from "../../../public/coverImage.jpg";
import icon1 from "../../../public/icon 1.svg";
import icon2 from "../../../public/icon 2.svg";
import icon3 from "../../../public/3.svg";
import Image from "next/image";

export default function MetDataSection() {
  return (
    <div>
      <div
        className="flex items-center h-64 gap-x-2 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage.src})` }}
      >
        <div className="flex-1 p-8 text-[26px] bg-white bg-opacity-75">
          Explore comprehensive meteorological datasets, covering over a century
          of climate records (1901–2002) across all districts of India. This
          treasure trove of climate data, sourced from the India Water Portal
          and the Tyndall Centre for Climate Change Research, provides valuable
          insights into India&apos;s water and climate dynamics.
        </div>
        <div className="flex-1 relative h-full flex items-center justify-center">
          <h1 className="text-white text-6xl font-extrabold">Met Data</h1>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold text-center my-20">What it offers</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-40 mt-5">
        <div className="flex flex-col items-center w-60">
          <div className="w-40 h-40 flex items-center justify-center">
            <Image src={icon1} alt="Icon 1" width={160} height={160} />
          </div>
          <p className="mt-2 text-center w-56 text-lg">Climate trend plots for over a century (1901–2002)</p>
        </div>
        <div className="flex flex-col items-center w-60">
          <div className="w-40 h-40 flex items-center justify-center">
            <Image src={icon2} alt="Icon 2" width={160} height={160} />
          </div>
          <p className="mt-2 text-center w-80 text-lg">13 critical climate variables, including rainfall, temperature, and humidity</p>
        </div>
        <div className="flex flex-col items-center w-60">
          <div className="w-40 h-40 flex items-center justify-center">
            <Image src={icon3} alt="Icon 3" width={120} height={120} />
          </div>
          <p className="mt-2 text-center w-56 text-lg">Downloadable CSV files for seamless data analysis</p>
        </div>
      </div>
    </div>
  );
}