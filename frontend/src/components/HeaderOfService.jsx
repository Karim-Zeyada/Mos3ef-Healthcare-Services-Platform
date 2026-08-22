/** @format */

import React from "react";
import { HeartButton } from "./HeartButton";
import { Online } from "./Online";
import { RatingOfServices } from "./RatingOfServices";

export const HeaderOfService = ({ image, name, rating, isOnline, serviceId }) => {
  return (
    <header className="relative w-full h-[147px] rounded-2xl overflow-hidden shadow-[0px_4px_4px_#7cc1e9]">
      <img
        src={image}
        alt={name || "صورة الخدمة"}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute top-[35px] left-0 w-full h-28 bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(168,214,240,1)_100%)]" />
      <div className="flex flex-col w-full items-end absolute top-[97px] -left-2 px-2">
        <RatingOfServices rating={rating} />
        <h2 className="self-stretch font-bold [direction:rtl] font-Cairo text-Blue-900 text-sm tracking-[0] leading-[normal] truncate">
          {name}
        </h2>
      </div>
      <HeartButton serviceId={serviceId} />
      <Online isOnline={isOnline} />
    </header>
  );
};
export default HeaderOfService;
