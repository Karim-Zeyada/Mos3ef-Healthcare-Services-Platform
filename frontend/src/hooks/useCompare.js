import { useContext } from "react";
import { CompareContext } from "../Context/CompareContext";

const useCompare = () => useContext(CompareContext);
export default useCompare;
