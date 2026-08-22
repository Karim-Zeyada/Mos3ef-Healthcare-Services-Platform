/** @format */

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SearchIcon, Map, FilterIcon } from "lucide-react";
import { useSearch } from "../hooks/useSearch.js";
import { useState } from "react";
import { HospitalCard } from "./HospitalCard.jsx";
import MapComponent from "./Map.jsx";
const filterTags = [
  { label: "طوارئ 24/7", value: "emergency", category: "EmergencyRoom" },
  { label: "عناية مركزة", value: "icu", category: "ICU" },
  { label: "حضانة أطفال", value: "nursery", category: "NICU" },
  { label: "بنك دم", value: "blood-bank", category: "BloodBank" },
  { label: "غرفة عمليات", value: "operation", category: "OperationTheater" },
  { label: "جناح عام", value: "general-ward", category: "GeneralWard" },
  { label: "غرفة خاصة", value: "private-room", category: "PrivateRoom" },
  { label: "قسم الولادة", value: "maternity", category: "MaternityWard" },
  { label: "أطفال", value: "pediatric", category: "PediatricWard" },
  { label: "أشعة", value: "radiology", category: "Radiology" },
  { label: "المعمل", value: "laboratory", category: "Laboratory" },
  { label: "صيدلية", value: "pharmacy", category: "Pharmacy" },
  { label: "عيادات خارجية", value: "outpatient", category: "OutpatientClinic" },
  { label: "إسعاف", value: "ambulance", category: "AmbulanceService" },
  { label: "تأهيل", value: "rehabilitation", category: "Rehabilitation" },
  { label: "أسنان", value: "dental", category: "DentalClinic" },
  { label: "قلب", value: "cardiology", category: "CardiologyUnit" },
  { label: "غسيل كلوي", value: "dialysis", category: "DialysisUnit" },
];
export const SearchSection = () => {
  const { results, searchByCategory, searchByKeyword, clearResults } =
    useSearch();
  const [keyword, setKeyword] = useState("");
  const [showMap, setShowMap] = useState(false);
useEffect(() => {
  clearResults();
}, []);

  const handleKeywordSearch = () => {
    if (!keyword.trim()) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        searchByKeyword(keyword, lat, lon);
      },
      () => {
        searchByKeyword(keyword);
      }
    );
  };
  const handleCategorySearch = (cat) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        searchByCategory(cat, lat, lon);
      },
      () => {
        searchByCategory(cat);
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center  gap-5  max-w-[848px]">
      <div className="flex items-center gap-2 md:gap-4 w-full">
        {/* Search Input */}
        <div className="flex items-center justify-end gap-2 px-4  md:px-8 py-2 md:py-3 flex-1 rounded-3xl border border-solid border-Blue-900/40 ">
          <Input
            className="font-Cairo text-Blue-900 text-base  md:text-xl [direction:rtl] w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto  placeholder:text-gray-400"
            placeholder=" بحث"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon
            onClick={handleKeywordSearch}
            className="w-5 h-5 md:w-6 md:h-6 text-Blue"
          />
        </div>
      </div>

      {/* Filter */}
      {/* Filter Tags */}
      <div className="flex   gap-2 md:gap-3 w-full [direction:rtl]">
        <Button
          onClick={() => setShowMap(!showMap)}
          className="inline-flex items-center justify-center md:w-[84px] md:h-[53px]  gap-1 px-6 lg:px-8 py-2  bg-Blue rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue/90 transition-colors"
        >
          <Map className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full [direction:rtl]">
          {filterTags.map((tag) => (
            <Badge
              key={tag.value}
              onClick={() => handleCategorySearch(tag.category)}
              className="inline-flex items-center justify-center gap-1 px-4 md:px-6 lg:px-8 py-2 h-auto bg-Blue-200 rounded-3xl overflow-hidden shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue-200/90 transition-colors cursor-pointer"
            >
              <div className="font-Cairo text-Blue-900 text-sm md:text-base lg:text-xl [direction:rtl] whitespace-nowrap">
                {tag.label}
              </div>
            </Badge>
          ))}
        </div>
      </div>
      
        {results.length > 0 && (
          <div className="w-full">
            {!showMap && (
              <div className="mt-6 mb-4 w-full justify-center py-6 border border-Blue-900 rounded-2xl bg-Blue-200 flex items-center gap-2 flex-wrap">
                {results.map((item, index) => (
                  <HospitalCard key={index} item={item} />
                ))}
              </div>
            )}

            {showMap && (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] mb-10 rounded-lg overflow-hidden border border-Blue-900">
                <MapComponent results={results} />
              </div>
            )}
          </div>
        )}

    </div>
  );
};
