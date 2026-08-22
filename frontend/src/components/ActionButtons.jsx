/** @format */

import React from "react";
import { Button } from "./ui/button";
import { AmbulanceIcon, BedIcon } from "lucide-react";
import { useSearch } from "../hooks/useSearch.js";
import { useNavigate } from "react-router-dom";

export const ActionButtons = () => {
  const {  searchByCategory } = useSearch();
  const navigate = useNavigate();

  const handleCategorySearch = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const data = await searchByCategory(
          "EmergencyRoom",
          pos.coords.latitude,
          pos.coords.longitude
        );

        if (data && data.length > 0) {
          navigate(`/service-details/${data[0].serviceId}`);
        }
      },
      async () => {
        const data = await searchByCategory("EmergencyRoom");

        if (data && data.length > 0) {
          navigate(`/service-details/${data[0].serviceId}`);
        }
      }
    );
  };



  const handleCall = () => {
    window.location.href = "tel:123";
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16 w-full max-w-[848px]">
      <Button
        onClick={handleCategorySearch}
        className="flex w-[65%] md:w-[265px] h-[50px] bg-Green items-center justify-center gap-2 px-8 py-2 rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-Green/90 transition-colors"
      >
        <div className="font-Cairo text-Blue-50 text-lg md:text-xl [direction:rtl]">
          أقرب طوارئ
        </div>
        <BedIcon className="w-5 h-5 text-Blue-50" />
      </Button>

      <Button
        onClick={handleCall}
        className="flex w-[65%] md:w-[265px] h-[50px] bg-[#b3261e] items-center justify-center gap-2 px-8 py-2 rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-[#b3261e]/90 transition-colors"
      >
        <div className="font-Cairo text-Blue-50 text-lg md:text-xl [direction:rtl]">
          اطلب الإسعاف
        </div>
        <AmbulanceIcon className="w-5 h-5 text-Blue-50" />
      </Button>
    </div>
  );
};
