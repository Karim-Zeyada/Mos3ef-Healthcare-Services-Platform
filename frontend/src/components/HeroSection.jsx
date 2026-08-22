import React from 'react'
import { assets } from '../assets/assets';
export const HeroSection = () => {
  return (
    <div className="Hero-section flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-0 [direction:rtl]">
      <div className="font-Lemon text-Blue-900 text-3xl md:text-4xl lg:text-5xl order-1 ">
        ابحث عن أقرب
      </div>
      <div className="font-Lemon rotate-0 md:rotate-[-8.69deg] relative text-Green-600 text-4xl md:text-5xl lg:text-[64px]  order-2">
        <img
          src={assets.hospital_bg}
          className=" -z-50 absolute -top-15 left-3 rotate-10 hidden md:inline-block overflow-hidden"
        />
        مستشفى
      </div>
      <div className=" font-Lemon text-Blue text-3xl md:text-4xl lg:text-5xl  order-3 ">
        ,بسرعة وسهولة
      </div>
    </div>
  );
}
