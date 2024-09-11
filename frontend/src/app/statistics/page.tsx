"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { states, districts, parameters, infoTypes } from "../../../Data";
import preloader from "../../../public/media/preLoader.gif";
import axios from "axios";
import Image from "next/image";
import DataTable from "@/components/Datatable";
import Dropdown from "@/components/Dropdown";

type StateKey = keyof typeof districts;

interface DataEntry {
  state: string;
  district: string;
  year: number;
  annual_mean: number;
}

export default function Statistics() {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [parameter, setParameter] = useState<string>("");
  const [startingYear, setStartingYear] = useState<number | undefined>();
  const [endingYear, setEndingYear] = useState<number | undefined>();
  const [infoType, setInfoType] = useState<string>("");
  const [data, setData] = useState<DataEntry[]>([]);
  const [showText, setShowText] = useState<boolean | undefined>();
  const [gifState, setGifState] = useState<boolean | undefined>(false);

  const tableRef = useRef<HTMLDivElement>(null);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    setDistrict("");
  };

  const handleEndingYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    if (startingYear && selectedYear < startingYear) {
      alert("Ending year must be greater than or equal to the starting year.");
      setEndingYear(undefined);
    } else {
      setEndingYear(selectedYear);
    }
  };

  const yearOptions = Array.from({ length: 103 }, (_, i) =>
    (1900 + i).toString()
  );

  const handleSubmit = () => {
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
    setGifState(true);
    console.log(state, district, parameter, startingYear, endingYear, infoType);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/statistics`, {
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
        setData(res.data.data);
        console.log(res.data.data);
        setGifState(false);
        setShowText(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${state}-${district}-${parameter}-${startingYear}-${endingYear}-${infoType}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredYearOptions = startingYear
    ? yearOptions.filter((year) => parseInt(year) >= startingYear)
    : yearOptions;

  useEffect(() => {
    if (showText && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showText]);

  const convertToNormalWords = (str: string) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <h1 className="mt-12 text-3xl font-bold">Mean Values</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center items-center gap-4 ">
            <Dropdown
              label="State"
              options={states}
              value={state}
              onChange={handleStateChange}
            />
            <Dropdown
              label="District"
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
              options={parameters.map(convertToNormalWords).sort((a, b) => a.localeCompare(b))}
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
              options={infoTypes.map(convertToNormalWords).sort((a, b) => a.localeCompare(b))}
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
            />
          </div>
          <div className="w-full h-12 m-4 flex justify-center">
            <button
              className="w-1/5 h-full bg-blue-500 text-white rounded-md hover:bg-[#159AB2] "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div
          ref={tableRef}
          className="output w-3/4 lg:w-3/5 h-96 mx-8 p-4 overflow-scroll no-scrollbar"
        >
          {showText && (
            <span className="chartInfo w-full h-10 my-12 lg:my-2 text-lg text-black flex items-center justify-center text-center">
              {infoType} for {state}, {district} over {parameter} from{" "}
              {startingYear} to {endingYear}
            </span>
          )}
          {gifState ? (
            <Image src={preloader} alt="Loading..." className="mx-auto" />
          ) : data.length > 0 ? (
            showText && <DataTable data={data} />
          ) : (
            showText && <p>No data available</p>
          )}{" "}
        </div>
        {showText && (
          <div className="flex justify-center">
            <button
              onClick={exportToCSV}
              className="my-4 p-2 bg-blue-500 text-white rounded"
            >
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </>
  );
}
