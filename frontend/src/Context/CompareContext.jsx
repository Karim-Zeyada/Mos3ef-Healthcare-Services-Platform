/** @format */

import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]); // max 2 items
  const [compareResult, setCompareResult] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:5000/api/";

  const addToCompare = (service) => {
    setCompareItems((prev) => {
      // Already in compare list
      if (prev.some((s) => s.serviceId === service.serviceId)) {
        return prev;
      }
      // If already 2 items, replace the oldest
      if (prev.length >= 2) {
        return [prev[1], service];
      }
      return [...prev, service];
    });
  };

  const removeFromCompare = (serviceId) => {
    setCompareItems((prev) => prev.filter((s) => s.serviceId !== serviceId));
    setCompareResult(null);
  };

  const clearCompare = () => {
    setCompareItems([]);
    setCompareResult(null);
    setShowCompareModal(false);
  };

  const isInCompare = (serviceId) => {
    return compareItems.some((s) => s.serviceId === serviceId);
  };

  const executeCompare = async () => {
    if (compareItems.length !== 2) return;

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}Services/compare`, {
        service1Id: compareItems[0].serviceId,
        service2Id: compareItems[1].serviceId,
      });
      setCompareResult(res.data.data);
      setShowCompareModal(true);
    } catch (err) {
      console.error("Error comparing services:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        compareResult,
        showCompareModal,
        loading,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        executeCompare,
        setShowCompareModal,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
