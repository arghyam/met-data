"use client";

import { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import { states, districts, parameters, infoTypes } from "../../../Data";

type StateType = string;
type DistrictType = string;
type ParameterType = string;
type InfoType = string;

type StateKey = keyof typeof districts;


type DropdownProps = {
  label: string;
  value: string | number | undefined;
  options: Array<string | number | JSX.Element>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function Dropdown({ label, value, options, onChange }: DropdownProps) {
  return (
    <div className="w-full h-12 m-4 flex justify-center">
      <select
        className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
        value={value}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options.map((option) =>
          typeof option === "string" || typeof option === "number" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            option
          )
        )}
      </select>
    </div>
  );
}

export default function Statistics() {
  const [selectedState, setSelectedState] = useState<StateType>("select a state");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictType | undefined>(undefined);
  const [selectedParameter, setSelectedParameter] = useState<ParameterType | undefined>(undefined);
  const [startingYear, setStartingYear] = useState<number | undefined>(undefined);
  const [endingYear, setEndingYear] = useState<number | undefined>(undefined);
  const [selectedInfoType, setSelectedInfoType] = useState<InfoType | undefined>(undefined);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => 
    (e: ChangeEvent<HTMLSelectElement>) => setter(e.target.value);

  const handleYearChange = (setter: React.Dispatch<React.SetStateAction<number | undefined>>) =>
    (e: ChangeEvent<HTMLSelectElement>) => setter(Number(e.target.value));

  const districtOptions = selectedState === "select a state"
    ? [<option key="select" value="select a district">Select a District</option>]
    : districts[selectedState as StateKey].map(district => (
        <option key={district} value={district}>{district}</option>
      ));

  const yearOptions = Array.from({ length: 103 }, (_, i) => 1900 + i).map(year => (
    <option key={year} value={year}>{year}</option>
  ));

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between lg:p-24">
        <h1 className="mt-24 text-3xl font-bold">Mean Values</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center items-center gap-4">
            <Dropdown
              label="Select a State"
              value={selectedState}
              options={states}
              onChange={handleChange(setSelectedState)}
            />
            <Dropdown
              label="Select a District"
              value={selectedDistrict}
              options={districtOptions}
              onChange={handleChange(setSelectedDistrict)}
            />
            <Dropdown
              label="Select a Parameter"
              value={selectedParameter}
              options={parameters}
              onChange={handleChange(setSelectedParameter)}
            />
            <Dropdown
              label="Select a Starting Year"
              value={startingYear}
              options={yearOptions}
              onChange={handleYearChange(setStartingYear)}
            />
            <Dropdown
              label="Select an Ending Year"
              value={endingYear}
              options={yearOptions}
              onChange={handleYearChange(setEndingYear)}
            />
            <Dropdown
              label="Select an Info Type"
              value={selectedInfoType}
              options={infoTypes}
              onChange={handleChange(setSelectedInfoType)}
            />
          </div>
          <div className="w-full h-12 m-4 flex justify-center">
            <button 
              className="w-1/5 h-full bg-blue-500 text-white rounded-1/2"
              onClick={() => {
                console.log(selectedState, selectedDistrict, selectedParameter, startingYear, endingYear, selectedInfoType);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}