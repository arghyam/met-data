"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  states,
  districts,
  parameters,
  infoTypes,
  units,
  UnitKey,
} from "../../../Data";
import preloader from "../../../public/media/preLoader.gif";
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
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedParameter, setSelectedParameter] = useState<string>("");
  const [startingYear, setStartingYear] = useState<number | undefined>();
  const [endingYear, setEndingYear] = useState<number | undefined>();
  const [selectedInfoType, setSelectedInfoType] = useState<string>("");
  const [data, setData] = useState<DataEntry[]>([]);
  const [isDataVisible, setIsDataVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tableRef = useRef<HTMLDivElement>(null);

  const handleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
  };

  const handleEndingYearSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const chosenYear = parseInt(e.target.value);
    if (startingYear && chosenYear < startingYear) {
      alert("Ending year must be greater than or equal to the starting year.");
      setEndingYear(undefined);
    } else {
      setEndingYear(chosenYear);
    }
  };

  const YEAR_OPTIONS = Array.from({ length: 103 }, (_, i) => (1900 + i).toString());

  const handleSubmit = () => {
    if (
      !selectedState ||
      !selectedDistrict ||
      !selectedParameter ||
      !startingYear ||
      !endingYear ||
      !selectedInfoType
    ) {
      alert("Please fill all the fields.");
      return;
    }
    setIsLoading(true);
    setData([]);
    setIsDataVisible(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/statistics`, {
        params: {
          state: selectedState,
          district: selectedDistrict,
          parameter: selectedParameter,
          startingYear,
          endingYear,
          infoType: selectedInfoType,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
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
      `${selectedState}-${selectedDistrict}-${selectedParameter}-${startingYear}-${endingYear}-${selectedInfoType}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredYearList = startingYear
    ? YEAR_OPTIONS.filter((year) => parseInt(year) >= startingYear)
    : YEAR_OPTIONS;

  useEffect(() => {
    if (isDataVisible && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDataVisible]);

  const convertToNormalWords = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Link href="/" legacyBehavior>
          <a className="text-black text-3xl font-bold hover:underline ml-40">
            Back
          </a>
        </Link>
        <Link href="/visualizations" legacyBehavior>
          <a className="text-black text-3xl font-bold hover:underline mr-40">
            Explore visual trends{" "}
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-between lg:px-16">
        <div className="filtersection lg:w-7/10 h-full mt-16">
          <div className="flex flex-col lg:grid lg:grid-cols-3 justify-center items-center gap-x-16">
            <Dropdown
              label="State"
              options={states}
              value={selectedState}
              onChange={handleStateSelect}
            />
            <Dropdown
              label="District"
              options={
                selectedState
                  ? [...districts[selectedState as StateKey]].sort((a, b) =>
                      a.localeCompare(b)
                    )
                  : []
              }
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            />
            <Dropdown
              label="Parameter"
              options={parameters
                .map(convertToNormalWords)
                .sort((a, b) => a.localeCompare(b))}
              value={selectedParameter}
              onChange={(e) => setSelectedParameter(e.target.value)}
            />
            <Dropdown
              label="Starting Year"
              options={YEAR_OPTIONS}
              value={startingYear?.toString() || ""}
              onChange={(e) => setStartingYear(parseInt(e.target.value))}
            />
            <Dropdown
              label="Ending Year"
              options={filteredYearList}
              value={endingYear?.toString() || ""}
              onChange={handleEndingYearSelect}
            />
            <Dropdown
              label="Info Type"
              options={infoTypes
                .map(convertToNormalWords)
                .sort((a, b) => a.localeCompare(b))}
              value={selectedInfoType}
              onChange={(e) => setSelectedInfoType(e.target.value)}
            />
          </div>
          <div className="w-full h-16 flex justify-center">
            <button
              className="w-1/4 h-full bg-blue-500 hover:bg-[#159AB2] rounded-full"
              onClick={handleSubmit}
            >
              <p className="text-white text-2xl font-extrabold">Submit</p>
            </button>
          </div>
        </div>
      </div>
      {isDataVisible && !isLoading && (
        <span className="chartInfo w-full h-10 my-12 lg:my-2 text-lg text-black font-extrabold flex items-center justify-center text-center">
          {selectedInfoType} for {selectedState}, {selectedDistrict} over{" "}
          {selectedParameter} from {startingYear} to {endingYear}
        </span>
      )}
      <div className="w-[90%] h-full ml-auto mr-auto p-8 overflow-scroll no-scrollbar">
        <div ref={tableRef} className="w-full h-auto flex flex-col items-center">
          {isLoading ? (
            <>
              <span className="tableInfo w-full h-10 my-12 lg:my-2 text-lg text-black font-extrabold flex items-center justify-center text-center">
                Loading the statistics...
              </span>
              <Image src={preloader} alt="Loading..." className="" />
            </>
          ) : data.length > 0 && isDataVisible ? (
            <>
              <DataTable data={data} parameter={selectedParameter} />
              <button
                onClick={exportToCSV}
                className="my-4 p-2 bg-green-500 hover:bg-green-700 text-white font-extrabold rounded"
              >
                Export to CSV
              </button>
            </>
          ) : (
            isDataVisible && <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}