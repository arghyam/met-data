"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  states,
  districts,
  parameters,
  units,
  UnitKey,
} from "../../../Data";
import { toPng } from "html-to-image";
import Image from "next/image";
import LineChart from "@/components/TrendPlot";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import preLoader from "../../../public/media/preLoader.gif";

type StateKey = keyof typeof districts;

export default function Visualizations() {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [parameter, setParameter] = useState<string>("");
  const [startingYear, setStartingYear] = useState<number | undefined>();
  const [endingYear, setEndingYear] = useState<number | undefined>();
  const [infoType, setInfoType] = useState<string>("");
  const [showText, setShowText] = useState<boolean | undefined>();
  const [data, setData] = useState<any | undefined>();
  const [gifState, setGifState] = useState<boolean | undefined>(false);

  const chartRef = useRef<HTMLDivElement>(null);

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    setDistrict("");
  };

  const handleEndingYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const endingYear = parseInt(event.target.value);

    if (startingYear && endingYear < startingYear) {
      alert("Ending year must be greater than or equal to the starting year.");
      setEndingYear(undefined);
    } else {
      setEndingYear(endingYear);
    }
  };

  const handleSubmit = () => {
    setShowText(true);
    setGifState(true);
    debuggerFunction();
    console.log(state, district, parameter, startingYear, endingYear, infoType);
    if (
      !state ||
      !district ||
      !parameter ||
      !startingYear ||
      !endingYear ||
      !infoType
    ) {
      alert("Please fill all the fields.");
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/visualizations`, {
        params: {
          state,
          district,
          parameter,
          startingYear,
          endingYear,
          infoType,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setGifState(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleExport = () => {
    const chartElement = document.querySelector(".plot") as HTMLElement;
    if (chartElement) {
      toPng(chartElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${state}_${district}_${parameter}_${startingYear}_${endingYear}_${infoType}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to export chart as PNG", err);
        });
    }
  };

  const yearOptions = Array.from({ length: 103 }, (_, i) =>
    (1900 + i).toString()
  );

  const filteredYearOptions = startingYear
    ? yearOptions.filter((year) => parseInt(year) >= startingYear)
    : yearOptions;

  useEffect(() => {
    if (showText && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showText]);

  const convertToNormalWords = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const unitKey = parameter.toLowerCase() as UnitKey;
  unitKey.replace(/\s+/g, "_");
  const unit = units[parameter.toLowerCase().replace(/\s+/g, "_") as UnitKey]

  const debuggerFunction = () => {
    console.log(unitKey);
    console.log(unit);
  };

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-between ${
          !showText && `lg:pd-16`
        } lg:px-16 `}
      >
        <h1 className="mt-12 text-3xl font-bold">Charts</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="flex flex-col lg:grid lg:grid-cols-3 justify-center items-center gap-4">
            <Dropdown
              label="State"
              options={states}
              value={state}
              onChange={handleStateChange}
            />
            <Dropdown
              label=" District"
              options={
                state
                  ? [...districts[state as StateKey]].sort((a, b) =>
                      a.localeCompare(b)
                    )
                  : []
              }
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <Dropdown
              label="Parameter"
              options={parameters
                .map(convertToNormalWords)
                .sort((a, b) => a.localeCompare(b))}
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
            />
            <Dropdown
              label="Starting Year"
              options={yearOptions}
              value={startingYear?.toString() || ""}
              onChange={(e) => setStartingYear(parseInt(e.target.value))}
            />
            <Dropdown
              label="Ending Year"
              options={filteredYearOptions}
              value={endingYear?.toString() || ""}
              onChange={handleEndingYearChange}
            />
            <Dropdown
              label="Info Type"
              options={["trend_plot"]
                .map(convertToNormalWords)
                .sort((a, b) => a.localeCompare(b))}
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
            />
          </div>
          <div className="w-full h-12 lg:m-4 flex justify-center">
            <button
              className="w-1/5 h-full bg-blue-500 hover:bg-[#159AB2] text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {showText && !gifState && (
        <span className="chartInfo w-full h-10 my-12 lg:my-2 text-lg text-black flex items-center justify-center text-center">
          Annual average trend for {state}, {district} over {parameter} from{" "}
          {startingYear} to {endingYear}
        </span>
      )}
      <div className="w-[90%] lg:w-3/5 h-full ml-auto mr-auto p-8 overflow-scroll no-scrollbar">
        <div
          ref={chartRef}
          className="chartArea w-full h-full flex flex-col items-center"
        >
          {gifState ? (
            <>
              <span className="chartInfo w-full h-10 my-12 lg:my-2 text-lg text-black flex items-center justify-center text-center">
                {" "}
                Loading the visualizations...{" "}
              </span>
              <Image src={preLoader} alt="Loading..." className="" />
            </>
          ) : (
            showText && (
              <>
                <div className="plot flex justify-center h-full bg-gray-200 hidden lg:block">
                  <div className="overflow-x-auto">
                    <LineChart
                      data={data}
                      width={900}
                      height={400}
                      xLabel={"Years"}
                      yLabel={parameter}
                      unit={unit}
                    />
                  </div>
                </div>
                <div className="plot flex justify-center h-full bg-gray-200 hidden md:block lg:hidden">
                  <div className="overflow-x-auto">
                    <LineChart
                      data={data}
                      width={600}
                      height={300}
                      xLabel={"Years"}
                      yLabel={parameter}
                      unit={unit}
                    />
                  </div>
                </div>
                <div className="plot h-full bg-gray-200 block md:hidden">
                  <div className="overflow-x-auto">
                    <LineChart
                      data={data}
                      width={400}
                      height={200}
                      xLabel={"Years"}
                      yLabel={parameter}
                      unit={unit}
                    />
                    s
                  </div>
                </div>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleExport}
                >
                  Export as PNG
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
