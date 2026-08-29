/** @format */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { LayoutDashboard, Star, Settings, LogOut } from "lucide-react";

const navigationItems = [
  {
    label: "لوحة التحكم",
    icon: LayoutDashboard,
    to: "/Hospital-DashBoard",
  },
  {
    label: "التقييمات والمراجعات",
    icon: Star,
    to: "/Hospital-DashBoard/reviews",
  },
  {
    label: "اعدادات المستشفى",
    icon: Settings,
    to: "/Hospital-DashBoard/update-profile",
  },
];

export const SideBarDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isItemActive = (to) => {
    if (!to) return false;
    if (to === "/Hospital-DashBoard") {
      return (
        location.pathname === "/Hospital-DashBoard" ||
        location.pathname === "/Hospital-DashBoard/"
      );
    }
    return location.pathname === to || location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="md:flex flex-col items-center hidden w-72 bg-[#1a2b45] min-h-screen p-4 border-l border-white/10 animate-fade-in select-none">
        <header className="flex flex-col items-center py-4 w-full border-b border-white/10 mb-4">
          <h1 className="font-Cairo font-bold text-[#e9f5fb] text-2xl tracking-wide [direction:rtl]">
            مسعف
          </h1>
          <span className="text-xs text-Blue-200/70 font-Cairo mt-1">
            لوحة تحكم المنشأة الطبية
          </span>
        </header>

        <nav className="flex flex-col w-full items-stretch gap-2.5 my-2">
          {navigationItems.map((item, index) => {
            const active = isItemActive(item.to);
            const Icon = item.icon;

            return (
              <button
                key={index}
                type="button"
                onClick={() => navigate(item.to)}
                className={`w-full flex items-center justify-end gap-3 px-5 py-3 rounded-2xl transition-all duration-200 font-Cairo text-lg cursor-pointer [direction:rtl] ${
                  active
                    ? "bg-[#d3eaf8] text-Blue-900 font-bold shadow-md ring-2 ring-[#d3eaf8]/40"
                    : "text-[#e9f5fb] hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <span>{item.label}</span>
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    active ? "text-Blue-900 scale-110" : "text-[#e9f5fb]/80"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <footer className="w-full mt-auto pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center justify-end gap-3 px-5 py-3 rounded-2xl bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 border border-red-500/20 transition-all duration-200 font-Cairo text-lg font-semibold cursor-pointer [direction:rtl]"
          >
            <span>تسجيل الخروج</span>
            <LogOut className="w-5 h-5 shrink-0 text-red-400" />
          </button>
        </footer>
      </aside>

      {/* Mobile Mini Sidebar */}
      <aside className="md:hidden flex flex-col items-center w-16 bg-[#1a2b45] min-h-screen py-4 px-2 border-l border-white/10 animate-fade-in select-none">
        <header className="flex flex-col items-center pb-3 w-full border-b border-white/10 mb-4">
          <h1 className="font-Cairo font-bold text-[#e9f5fb] text-sm">
            مسعف
          </h1>
        </header>

        <nav className="flex flex-col w-full items-center gap-3 my-2">
          {navigationItems.map((item, index) => {
            const active = isItemActive(item.to);
            const Icon = item.icon;

            return (
              <button
                key={index}
                type="button"
                onClick={() => navigate(item.to)}
                title={item.label}
                className={`p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#d3eaf8] text-Blue-900 shadow-md ring-2 ring-[#d3eaf8]/40"
                    : "text-[#e9f5fb] hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    active ? "text-Blue-900 scale-110" : "text-[#e9f5fb]/80"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <footer className="w-full mt-auto pt-3 border-t border-white/10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            title="تسجيل الخروج"
            className="p-3 rounded-2xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-400" />
          </button>
        </footer>
      </aside>
    </>
  );
};

