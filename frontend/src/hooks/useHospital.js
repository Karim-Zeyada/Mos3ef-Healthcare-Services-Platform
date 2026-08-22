/** @format */

import { useContext } from "react";
import { HospitalContext } from "../Context/HospitalContext.jsx";


export const useHospital = () => {
return useContext(HospitalContext);
   
};