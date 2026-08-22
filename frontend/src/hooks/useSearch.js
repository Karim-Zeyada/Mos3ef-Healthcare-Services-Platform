import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext.jsx";

export const useSearch = () => {
  return useContext(SearchContext);
};
