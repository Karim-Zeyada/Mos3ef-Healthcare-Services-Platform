/** @format */

import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/Services/search";

  // search by keyword function
  const searchByKeyword = async (keyword, lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL, {
        params: {
          keyword,
          lat,
          lon,
        },
      });
      setResults(res.data.data);
    } catch (err) {
      setError("حدث خطأ أثناء البحث");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // search by category function
  const searchByCategory = async (category, lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL, {
        params: {
          category,
          lat,
          lon,
        },
      });

      setResults(res.data.data);
       return res.data.data; 
    } catch (err) {
      setError("حدث خطأ أثناء البحث بالكاتيجوري");
      console.log(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // search by location function
  const searchByLocation = async (keyword, category, lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL, {
        params: {
          keyword,
          category,
          lat,
          lon,
        },
      });

      setResults(res.data.data);
    } catch (err) {
      console.log(err);
      setError("حدث خطأ أثناء البحث بالموقع");
    } finally {
      setLoading(false);
    }
  };
const clearResults = () => setResults([]);

  return (
    <SearchContext.Provider
      value={{
        results,
        loading,
        error,
        searchByKeyword,
        searchByCategory,
        searchByLocation,
        clearResults,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
