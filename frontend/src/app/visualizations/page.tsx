"use client";

import { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import LineChart from "@/components/TrendPlot";
import { plotdata } from "../../../Data/plotdata";
import { states, districts, parameters } from "../../../Data";

type StateKey = keyof typeof districts;

const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="w-full h-12 m-4 flex justify-center">
    <select
      className="w-[90%] text-center bg-gray-100 border-2 rounded-md"
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default function Visualizations() {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [parameter, setParameter] = useState<string>("");
  const [startingYear, setStartingYear] = useState<number | undefined>();
  const [endingYear, setEndingYear] = useState<number | undefined>();
  const [infoType, setInfoType] = useState<string>("");
  const [exportType, setExportType] = useState<string | undefined>();
  const [showText , setShowText] = useState<boolean | undefined>();

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    setDistrict(""); 
  };

  return (
    <div>
      <Navbar />
      <div className={`flex flex-col items-center justify-between ${!showText && `lg:pd-16`} lg:px-16 lg:pt-16`}>
        <h1 className="mt-24 text-3xl font-bold">Charts</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center items-center">
            <Dropdown
              label="Select a State"
              options={states}
              value={state}
              onChange={handleStateChange}
            />
            <Dropdown
              label="Select a District"
              options={state ? districts[state as StateKey] : []}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <Dropdown
              label="Select a Parameter"
              options={parameters}
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
            />
            <Dropdown
              label="Select a Starting Year"
              options={Array.from({ length: 103 }, (_, i) =>
                (1900 + i).toString()
              )}
              value={startingYear?.toString() || ""}
              onChange={(e) => setStartingYear(parseInt(e.target.value))}
            />
            <Dropdown
              label="Select an Ending Year"
              options={Array.from({ length: 103 }, (_, i) =>
                (1900 + i).toString()
              )}
              value={endingYear?.toString() || ""}
              onChange={(e) => setEndingYear(parseInt(e.target.value))}
            />
            <Dropdown
              label="Select an Info Type"
              options={["Trend_Chart"]}
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
            />
          </div>
          <div className="w-full h-12 lg:m-4 flex justify-center">
            <button
              className="w-1/5 h-full bg-blue-500 text-white rounded-md"
              onClick={() =>
                {
                console.log(
                  state,
                  district,
                  parameter,
                  startingYear,
                  endingYear,
                  infoType
                );
                setShowText(!showText);
              }
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full p-8">
        {showText && (
          <span className="chartInfo w-full h-10 my-12 lg:my-2 text-lg text-black flex items-center justify-center text-center">
            Annual average trend for {state}, {district} over {parameter} from{" "}
            {startingYear} to {endingYear}
          </span>
        )}
        <div className="chartArea w-full h-full flex justify-center">
          <div className="plot flex justify-center h-full bg-gray-200 hidden md:block">
            <LineChart
              data={plotdata}
              width={800}
              height={400}
              xLabel={"Years"}
              yLabel={parameter}
            />
          </div>
          <div className="plot h-full bg-gray-200 block md:hidden">
            <LineChart
              data={plotdata}
              width={300}
              height={200}
              xLabel={"Years"}
              yLabel={parameter}
            />
          </div>
        </div>
        <div className="exportDropdown w-full h-12 flex justify-center items-center my-4">
          <span className="h-full text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-l-md p-2">
            Export as :
          </span>
          <select
            className="h-full bg-blue-600 text-white border-2 border-blue-600 rounded-r-md px-4 hover:bg-blue-700 transition-colors"
            onChange={(e) => setExportType(e.target.value)}
            value={exportType}
          > 
            <option className="bg-gray-200 text-black" >NaN</option>
            <option className="bg-gray-200 text-black" value="png">PNG</option>
            <option className="bg-gray-200 text-black" value="svg">SVG</option>
          </select>
        </div>
      </div>
    </div>
  );
}
