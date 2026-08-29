/** @format */

import React from "react";
import { PatientProfileSideBar } from "../../components/PatientProfileSideBar";
import { EditProfile } from "../../components/EditProfile";
import { Outlet } from "react-router-dom";
import { SideBarMobile } from "../../components/SideBarMobile";

export const PatientProfile = () => {
  return (
    <div className="pt-28 pb-16 mx-auto px-4 md:px-6 lg:px-24 max-w-7xl">
      <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-start gap-8 w-full">
        <SideBarMobile />
        <div className="flex-1 w-full min-w-0">
          <Outlet />
        </div>
        <PatientProfileSideBar />
      </div>
    </div>
  );
};
