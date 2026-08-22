/** @format */

import React from "react";
import { assets } from "../assets/assets";
import { HeroSection } from "./HeroSection";
import { ActionButtons } from "./ActionButtons";
import { SearchSection } from "./SearchSection";


export const Header = () => {
  return (
    <>
      <div className=" mx-auto px-4 md:px-6 lg:px-36 ">
        <div className="flex flex-col  items-center justify-center mt-10 lg:mt-[95px] gap-8 md:gap-18">
          {/* Hero section */}
          <HeroSection />
          {/* Search & Filter Section */}
         <SearchSection />
          {/* Action Buttons */}
          <ActionButtons />
          {/* hospital image */}
          <div className="flex justify-center items-center">
            <img
              src={assets.hospital}
              alt="hospital"
              className="md:w-[628px] md:h-[430px] w-[314px] h-[216px] "
            />
          </div>
        </div>
      </div>
    </>
  );
};
