/** @format */

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { MenuIcon, XIcon, Hospital, HeartPulse } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { PatientImage } from "./PatientImage";

export const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "الرئيسية", path: "/" },
    { label: "الطوارئ", path: "/emergency", icon: HeartPulse },
    { label: "خدماتنا", path: "/services" },
    { label: "المستشفيات", path: "/hospitals" },
    { label: "من نحن", path: "/about" },
  ];

  const handleNavigateProfile = () => {
    if (role === 0) {
      navigate("/PatientProfile");
    } else {
      navigate("/Hospital-DashBoard");
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-[inset_0px_0px_22px_#f2f2f280] backdrop-blur-[10px] bg-white/70">
        <div className="flex mx-auto justify-between items-center px-4 md:px-8 lg:px-[156px] py-3">
          {/* ----------Logo---------- */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              className="w-8 h-8 md:w-[46px] md:h-11"
              alt="Logo"
              src={assets.logo}
            />
            <div className="font-Lateef text-Blue-900 text-lg md:text-3xl font-bold">
              مسعف
            </div>
          </Link>

          {/* ----------Desktop Nav Pills---------- */}
          <ul className="hidden md:flex items-center justify-center gap-2 lg:gap-3 px-3 py-2 bg-Blue-900 rounded-[84px] [direction:rtl]">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              const ItemIcon = item.icon;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`inline-flex items-center justify-center gap-1.5 px-5 lg:px-6 py-2 rounded-3xl font-Cairo text-sm lg:text-base whitespace-nowrap transition-all duration-200 ${
                      active
                        ? "bg-Blue text-white shadow-[0px_0px_8px_rgba(22,90,128,0.6)] font-semibold"
                        : "text-Blue-50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {ItemIcon && (
                      <ItemIcon
                        className={`w-4 h-4 transition-colors ${
                          active ? "text-rose-300" : "text-rose-400"
                        }`}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ----------Desktop Buttons---------- */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <Link
                to="/SignUp-Hospital"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-3xl border border-Blue-900/30 hover:border-Blue-900 bg-Blue-50/60 hover:bg-Blue-50 transition-colors font-Cairo text-Blue-900 text-xs lg:text-sm font-semibold"
                title="انضم كشريك طبي"
              >
                <Hospital className="w-4 h-4 text-Blue-900" />
                <span>انضم كشريك</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors font-Cairo text-Blue-900 text-base"
              >
                خروج
              </button>
            ) : (
              <Link
                to="/LogIn"
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors font-Cairo text-Blue-900 text-base"
              >
                دخول
              </Link>
            )}

            <div className="text-[#5a9648] text-xl">|</div>

            {user ? (
              <button
                onClick={handleNavigateProfile}
                className="inline-flex w-10 h-10 rounded-full bg-Blue hover:ring-2 hover:ring-Blue transition-all overflow-hidden items-center justify-center"
                title="الملف الشخصي"
              >
                <PatientImage Size="w-full h-full" />
              </button>
            ) : (
              <Link
                to="/SignUp"
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl border border-solid border-Blue-900 bg-Blue-900 text-white hover:bg-Blue-900/90 transition-colors font-Cairo text-white text-base"
              >
                تسجيل
              </Link>
            )}
          </div>

          {/* ----------Menu Icon---------- */}
          <MenuIcon
            className="md:hidden w-7 cursor-pointer text-Blue-900"
            onClick={() => setShowMobileMenu(true)}
          />
        </div>

        {/* ----------Mobile Menu (Slide from right)--------- */}
        <div
          className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] bg-Blue-900 z-[9999] transform transition-transform duration-500 ease-in-out ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-6 cursor-pointer">
            <XIcon
              className="w-6 text-Blue-50"
              onClick={() => setShowMobileMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-3 mt-4 px-6 text-lg font-medium">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              const ItemIcon = item.icon;

              return (
                <li key={index} className="w-full text-center">
                  <Link
                    to={item.path}
                    className={`px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2 font-Cairo [direction:rtl] w-full transition-colors ${
                      active
                        ? "bg-Blue text-white font-semibold"
                        : "text-Blue-50 hover:bg-white/10"
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {ItemIcon && (
                      <ItemIcon
                        className={`w-4 h-4 ${
                          active ? "text-rose-300" : "text-rose-400"
                        }`}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {!user && (
            <div className="mt-6 px-6 w-full [direction:rtl]">
              <Link
                to="/SignUp-Hospital"
                onClick={() => setShowMobileMenu(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-Cairo text-sm transition-all"
              >
                <Hospital className="w-4 h-4 text-Blue-100" />
                <span>انضم كشريك طبي (مستشفى)</span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 justify-center mt-6 px-6">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setShowMobileMenu(false);
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl border border-solid border-Blue bg-transparent text-Blue-50 font-Cairo text-base hover:bg-Blue/20 transition-colors"
              >
                خروج
              </button>
            ) : (
              <Link
                to="/LogIn"
                onClick={() => setShowMobileMenu(false)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl border border-solid border-Blue bg-transparent text-Blue-50 font-Cairo text-base hover:bg-Blue/20 transition-colors"
              >
                دخول
              </Link>
            )}

            <div className="text-Green text-xl">|</div>

            {user ? (
              <button
                onClick={() => {
                  handleNavigateProfile();
                  setShowMobileMenu(false);
                }}
                className="inline-flex w-10 h-10 rounded-full bg-Blue hover:bg-Blue-900/10 transition-colors items-center justify-center overflow-hidden"
              >
                <PatientImage Size="w-10 h-10" />
              </button>
            ) : (
              <Link
                to="/SignUp"
                onClick={() => setShowMobileMenu(false)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-3xl bg-Blue text-Blue-50 font-Cairo text-base hover:bg-Blue/90 transition-colors"
              >
                تسجيل
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
