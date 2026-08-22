import React from 'react'
import {SideBarDashBoard} from '../../components/SideBarDashBoard'
import { Outlet } from "react-router-dom";

export const DashBoard = () => {
  return (
    <div className="flex w-full flex-1">
      <Outlet />
      <SideBarDashBoard />
    </div>
  );
}
