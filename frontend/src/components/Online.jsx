/** @format */

import React from "react";

export const Online = ({ isOnline }) => {
  return (
    <>
      {isOnline !== null && (
        <div
          className={`absolute top-[19px] left-5 w-2 h-2 rounded shadow-[0px_0px_5.2px_#294521,0px_0px_8px_#000000] ${
            isOnline ? "bg-[#86bd75]" : "bg-red-500"
          }`}
          aria-label={isOnline ? "Online" : "Offline"}
        />
      )}
    </>
  );
};
