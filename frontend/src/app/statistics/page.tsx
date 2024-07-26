"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { states } from "../../../Data";
import { districts } from "../../../Data";
import { parameters } from "../../../Data";
import { infoTypes } from "../../../Data";
import axios from "axios";

type StateType = string;
type DistrictType = string;
type ParameterType = string;
type InfoType = string;
type StateKey = "JAMMU & KASHMIR" |
  "CHANDIGARH" |
  "PUNJAB" |
  "UTTARANCHAL" |
  "HIMACHAL PRADESH" |
  "HARYANA" |
  "MANIPUR" |
  "MAHARASHTRA" |
  "RAJASTHAN" |
  "UTTAR PRADESH" |
  "DELHI" |
  "BIHAR" |
  "SIKKIM" |
  "ARUNACHAL PRADESH" |
  "DAMAN & DIU" |
  "NAGALAND" |
  "MIZORAM" |
  "ASSAM" |
  "TRIPURA" |
  "MEGHALAYA" |
  "KERALA" |
  "PONDICHERRY" |
  "GOA" |
  "LAKSHADWEEP" |
  "WEST BENGAL" |
  "ORISSA" |
  "JHARKHAND" |
  "CHHATTISGARH" |
  "MADHYA PRADESH" |
  "ANDAMAN & NICOBAR ISLANDS" |
  "GUJARAT" |
  "DADRA & NAGAR HAVELI" |
  "ANDHRA PRADESH" |
  "KARNATAKA" |
  "TAMIL NADU";


export default function Statistics() {
  // defining states for the dropdown selector
  const [state, setState] = useState<StateType>("select a state");
  const [district, setDistrict] = useState<DistrictType | undefined>(undefined);
  const [parameter, setParameter] = useState<ParameterType | undefined>(
    undefined
  );
  const [startingYear, setStartingYear] = useState<number | undefined>(
    undefined
  );
  const [endingYear, setEndingYear] = useState<number | undefined>(undefined);
  const [infoType, setInfoType] = useState<InfoType | undefined>(undefined);

  // defining the response data
  const [data, setData] = useState<any>(undefined);

  // defining the event handlers
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
  };

  const handleParameterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParameter(e.target.value);
  };

  const handleStartingYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStartingYear(Number(e.target.value));
  };

  const handleEndingYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEndingYear(Number(e.target.value));
  };

  const handleInfoTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInfoType(e.target.value);
  };

  // defining the submission handler
  const handleSubmission = async ({
    state,
    district,
    parameter,
    startingYear,
    endingYear,
    infoType,
  }: {
    state: StateType;
    district: DistrictType | undefined;
    parameter: ParameterType | undefined;
    startingYear: number | undefined;
    endingYear: number | undefined;
    infoType: InfoType | undefined;
  }) => {
    try {
      // fetching the data from the backend
      const response = await axios.get("http://localhost:3001/statistics", {
        params: {
          state,
          district,
          parameter,
          startingYear,
          endingYear,
          infoType,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between lg:p-24">
        <h1 className="mt-24 text-3xl font-bold">Mean Values</h1>
        <div className="filtersection lg:w-3/5 h-full mt-16">
          <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center items-center">
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleStateChange}
              >
                <option value="select a state">Select a State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleDistrictChange}
              >
                <option value="select a district">Select a District</option>
                {
                  state === "select a state" ? (
                    <option value="select a district">Select a District</option>
                  ) : (
                    districts[state as StateKey].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))
                  )
                }
              </select>
            </div>
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleParameterChange}
              >
                <option value="select a parameter">Select a Parameter</option>
                {parameters.map((parameter) => (
                  <option key={parameter} value={parameter}>
                    {parameter}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleStartingYearChange}
              >
                <option value="select a starting year">
                  Select a Starting Year
                </option>
                {Array.from({ length: 103 }, (_, i) => i + 1900).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleEndingYearChange}
              >
                <option value="select a ending year">Select a Ending Year</option>
                {Array.from({ length: 103 }, (_, i) => i + 1900).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-12 m-4 flex justify-center">
              <select
                className="w-[90%] text-center bg-gray-100 border-2 rounded-1/2"
                onChange={handleInfoTypeChange}
              >
                <option value="select a info type">Select a Info Type</option>
                {infoTypes.map((infoType) => (
                  <option key={infoType} value={infoType}>
                    {infoType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full h-12 m-4 flex justify-center">
            <button 
              className="w-1/5 h-full bg-blue-500 text-white rounded-1/2"
              onClick={() => {
                handleSubmission({
                  state,
                  district,
                  parameter,
                  startingYear,
                  endingYear,
                  infoType,
                });
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
