/** @format */

import React from "react";
import { Button } from "./ui/button";
import { AmbulanceIcon, AlertTriangle, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ActionButtons = () => {
  const navigate = useNavigate();

  const handleOpenEmergencyHub = () => {
    navigate("/emergency");
  };

  const handleCall = () => {
    window.location.href = "tel:123";
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full max-w-[848px]">
      <Button
        onClick={handleOpenEmergencyHub}
        className="flex w-full sm:w-[260px] h-[52px] bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 items-center justify-center gap-2 px-6 py-2 rounded-3xl shadow-[0px_4px_12px_rgba(220,38,38,0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <div className="font-Cairo font-bold text-white text-base md:text-lg [direction:rtl]">
          مركز الطوارئ المنقذ
        </div>
        <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
      </Button>

      <Button
        onClick={handleCall}
        className="flex w-full sm:w-[260px] h-[52px] bg-[#165a80] hover:bg-[#114866] items-center justify-center gap-2 px-6 py-2 rounded-3xl shadow-[0px_4px_12px_rgba(22,90,128,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <div className="font-Cairo font-bold text-white text-base md:text-lg [direction:rtl]">
          اطلب الإسعاف (123)
        </div>
        <PhoneCall className="w-5 h-5 text-emerald-300" />
      </Button>
    </div>
  );
};
