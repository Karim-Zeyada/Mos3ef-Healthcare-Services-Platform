/** @format */

import React from "react";
import { PatientProfileSideBar } from "../../components/PatientProfileSideBar";
import { EditProfile } from "../../components/EditProfile";
import { Outlet } from "react-router-dom";
import { SideBarMobile } from "../../components/SideBarMobile";

export const PatientProfile = () => {
  return (
    <>
    <div className="pt-30 mx-auto px-3 md:px-6 lg:px-36 ">
      <div className="flex justify-center lg:justify-between gap-10 bg-white w-full">
          <SideBarMobile/>
        <Outlet />
        <PatientProfileSideBar />
      </div>
    </div>
    </>
  );
};
