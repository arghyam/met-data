import { useState } from "react";
import Navbar from "@/components/Navbar"


export default function Statistics() {

    const[state, setState] = useState();
    const[district, setDistrict] = useState();
    const[parameter, setParameter] = useState();
    const[startingYear, setStartingYear] = useState();
    const[endingYear, setEndingYear] = useState();
    const[infoType, setInfoType] = useState();

    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-between p-24">
            <h1 className="mt-24 text-3xl font-bold">Mean Values</h1>
        </div>
        </>
    )
};