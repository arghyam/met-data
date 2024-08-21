"use client";

import { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import { states, districts, parameters, infoTypes } from "../../../Data";
import axios from "axios";
import DataTable from "@/components/Datatable";

type StateKey = keyof typeof districts;

type DropdownProps = {
  label: string;
  value: string;
  options: Array<string>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

interface DataEntry {
  state: string;
  district: string;
  year: number;
  annual_mean: number;
}

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => (
  <div className="w-full m-4 flex flex-col items-center">
    <div className="w-full text-left">
      <label className="ml-4 text-[#067A91]">{label}</label>
    </div>
    <select
      className="w-[90%] h-12 text-center bg-gray-100 border-2 rounded-md"
      value={value}
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default function Statistics() {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [parameter, setParameter] = useState<string>("");
  const [startingYear, setStartingYear] = useState<number | undefined>();
  const [endingYear, setEndingYear] = useState<number | undefined>();
  const [infoType, setInfoType] = useState<string>("");
  const [data, setData] = useState<DataEntry[]>([]);

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
    if (!state || !district || !parameter || !startingYear || !endingYear || !infoType) {
      alert("Please fill all the fields.");
      return;
    }
    console.log(state, district, parameter, startingYear, endingYear, infoType);
    axios
      .get("http://localhost:8080/api/statistics", {
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between lg:p-24">
        <h1 className="mt-24 text-3xl font-bold">Mean Values</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center items-center gap-4">
            <Dropdown
              label="State"
              options={states}
              value={state}
              onChange={handleStateChange}
            />
            <Dropdown
              label="District"
              options={state ? districts[state as StateKey] : []}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <Dropdown
              label="Parameter"
              options={parameters}
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
              options={yearOptions}
              value={endingYear?.toString() || ""}
              onChange={handleEndingYearChange}
            />
            <Dropdown
              label="Select an Info Type"
              options={infoTypes}
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
            />
          </div>
          <div className="w-full h-12 m-4 flex justify-center">
            <button
              className="w-1/5 h-full bg-blue-500 text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="output w-3/4 lg:w-3/5 h-96 m-8 bg-gray-200 p-4 overflow-scroll">
          {data.length > 0 ? <DataTable data={data} /> : <p>No data available</p>}
        </div>
      </div>
    </>
  );
}
