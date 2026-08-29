import React from 'react';
import { Card, CardContent } from './ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { PatientImage } from './PatientImage';
import { useAuth } from '../hooks/useAuth.js';

const profileMenuItems = [
  {
    label: "تعديل الملف الشخصي",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/fi-edit.svg",
    to: "/PatientProfile",
  },
  {
    label: "الخدمات المحفوظة",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-heart.svg",
    to: "/PatientProfile/savedServices",
  },
  {
    label: "تقييماتي",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-star.svg",
    to: "/PatientProfile/myReviews",
  },
  {
    label: "تسجيل الخروج",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-exit.svg",
    danger: true,
  },
];

export const PatientProfileSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const isItemActive = (item) => {
    if (item.danger || !item.to) return false;
    if (item.to === "/PatientProfile") {
      return location.pathname === "/PatientProfile" || location.pathname === "/PatientProfile/";
    }
    return location.pathname === item.to || location.pathname.startsWith(item.to);
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 min-h-[472px] hidden lg:flex items-start animate-fade-in [--animation-delay:400ms]">
      <Card className="flex flex-col w-full min-h-[456px] items-start gap-6 pt-6 pb-6 px-5 bg-white rounded-[24px] shadow-[0px_2px_8px_-2px_#0000001a,0px_4px_12px_-1px_#0000001a] border border-gray-100">
        <CardContent className="flex flex-col w-full p-0 gap-6">
          {/* Header with Avatar & Name */}
          <div className="flex flex-col items-center justify-center gap-3 pt-0 pb-5 px-0 w-full border-b border-gray-100">
            <div className="flex h-24 w-24 rounded-full bg-Blue-900 text-white overflow-hidden ring-4 ring-Blue/15 shadow-sm">
              <PatientImage Size="w-full h-full" />
            </div>

            <div className="justify-center flex items-center gap-1 w-full mt-1">
              <h2 className="w-fit font-Cairo font-bold text-[#1a2b45] text-xl text-center leading-6 whitespace-nowrap [direction:rtl]">
                {user?.name || "المريض"}
              </h2>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col items-stretch gap-2 w-full">
            {profileMenuItems.map((item, index) => {
              const active = isItemActive(item);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (item.danger) {
                      logout();
                      navigate("/");
                    } else if (item.to) {
                      navigate(item.to);
                    }
                  }}
                  className={`flex items-center justify-start gap-3.5 px-5 py-3 w-full rounded-2xl [direction:rtl] font-Cairo text-lg transition-all duration-200 cursor-pointer ${
                    item.danger
                      ? "text-red-500 hover:bg-red-50 hover:text-red-700 font-medium"
                      : active
                      ? "bg-[#d3eaf8] text-Blue-900 font-bold shadow-xs"
                      : "text-gray-700 hover:bg-Blue-50/80 hover:text-Blue-900 font-medium"
                  }`}
                >
                  <img
                    className={`w-6 h-6 object-contain shrink-0 transition-transform duration-200 ${
                      active ? "scale-110" : ""
                    }`}
                    alt={item.label}
                    src={item.icon}
                  />
                  <span className="leading-normal">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

