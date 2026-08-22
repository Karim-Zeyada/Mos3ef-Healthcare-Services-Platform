/** @format */

import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth.js'
const navigationItems = [
  {
    label: "لوحة التحكم",
    icon: "https://c.animaapp.com/miks4oe9SWsilu/img/u-create-dashboard.svg",
    active: true,
    to: "/Hospital-DashBoard",
  },
  {
    label: "التقيمات والمراجعات",
    icon: "https://c.animaapp.com/miks4oe9SWsilu/img/u-star.svg",
    active: false,
    to: "/Hospital-DashBoard/reviews",
  },
  {
    label: "اعدادات المستشفى",
    icon: "https://c.animaapp.com/miks4oe9SWsilu/img/u-setting.svg",
    active: false,
    to: "/Hospital-DashBoard/update-profile",
  },
];

export const SideBarDashBoard = () => {
 const navigate = useNavigate();
 const { logout } = useAuth(); 
  return (
    <>
      <aside className="md:flex flex-col items-center hidden max-w-72  bg-[#1a2b45] min-h-screen  animate-fade-in [--animation-delay:0ms]">
        <header className="flex flex-col  items-center px-0 py-3 w-full border-b-[0.8px]  border-[#fffefe1a]">
          <div className="inline-flex h-[53px] items-center justify-center gap-2">
            <h1 className="font-Cairo font-normal text-[#e9f5fb] text-2xl text-left tracking-[0] leading-[normal] [direction:rtl]">
              مسعف
            </h1>
          </div>
        </header>

        <nav className="flex mt-2 mb-28 flex-col w-[274px] items-center gap-2 px-0 py-1  animate-fade-in [--animation-delay:200ms]">
          {navigationItems.map((item, index) => (
            <Button
              onClick={() => navigate(item.to)}
              key={index}
              variant="ghost"
              className={`w-full h-auto flex items-center justify-end gap-1 px-8 py-2 rounded-[20px] transition-colors hover:bg-[#d3eaf8]/10 ${
                item.active
                  ? "bg-[#d3eaf8] text-Blue-900 hover:bg-[#d3eaf8]"
                  : "bg-transparent text-[#e9f5fb]"
              }`}
            >
              <span className="font-Cairo font-normal text-xl text-left tracking-[0] leading-[normal] [direction:rtl]">
                {item.label}
              </span>
              <img
                className="max-w-12 w-5 max-h-12 h-5"
                alt={item.label}
                src={item.icon}
              />
            </Button>
          ))}
        </nav>

        <footer className="w-[274px] mt-auto mb-3  animate-fade-in [--animation-delay:400ms]">
          <Button
            variant="ghost"
            className="w-full h-auto bg-[#ffdcdcb2] hover:bg-[#ffdcdc] flex items-center justify-end gap-1 px-8 py-2 rounded-[20px] transition-colors"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <span className="font-semibold text-[#0f3d57] font-Cairo text-xl text-left tracking-[0] leading-[normal] [direction:rtl]">
              تسجيل الخروج
            </span>
            <img
              className="max-w-12 w-5 max-h-12 h-5"
              alt="تسجيل الخروج"
              src="https://c.animaapp.com/miks4oe9SWsilu/img/u-exit.svg"
            />
          </Button>
        </footer>
      </aside>

      <aside className="md:hidden flex-col items-center flex w-14  bg-[#1a2b45] min-h-screen  animate-fade-in [--animation-delay:0ms]">
        <header className="flex flex-col  items-center px-0 py-3 w-full border-b-[0.8px]  border-[#fffefe1a]">
          <div className="inline-flex h-10 items-center justify-center gap-2">
            <h1 className="font-Cairo font-normal text-[#e9f5fb] text-sm text-left tracking-[0] leading-[normal] [direction:rtl]">
              مسعف
            </h1>
          </div>
        </header>

        <nav className="flex mt-2 mb-28 flex-col w-6 items-center gap-2 px-0 py-1  animate-fade-in [--animation-delay:200ms]">
          {navigationItems.map((item, index) => (
            <Button
              onClick={() => navigate(item.to)}
              key={index}
              variant="ghost"
              className={`w-full h-auto flex items-center justify-center gap-1 px-3 py-1 rounded-[20px] transition-colors hover:bg-[#d3eaf8]/10 ${
                item.active
                  ? "bg-[#d3eaf8] text-Blue-900 hover:bg-[#d3eaf8]"
                  : "bg-transparent text-[#e9f5fb]"
              }`}
            >
              <img
                className="max-w-12 w-5 max-h-12 h-5"
                alt={item.label}
                src={item.icon}
              />
            </Button>
          ))}
        </nav>

        <footer className="w-10 mt-auto mb-3  animate-fade-in [--animation-delay:400ms]">
          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
            variant="ghost"
            className="w-full h-auto bg-[#ffdcdcb2] hover:bg-[#ffdcdc] flex items-center justify-center gap-1 px-3 py-1 rounded-[20px] transition-colors"
          >
            <img
              className="max-w-12 w-5 max-h-12 h-5"
              alt="تسجيل الخروج"
              src="https://c.animaapp.com/miks4oe9SWsilu/img/u-exit.svg"
            />
          </Button>
        </footer>
      </aside>
    </>
  );
};
