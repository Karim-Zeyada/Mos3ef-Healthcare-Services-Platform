import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { SideBarMobile } from "./SideBarMobile";
import { PatientImage } from './PatientImage';
import { useAuth } from '../hooks/useAuth.js';
const profileMenuItems = [
  {
    label: "تعديل الملف الشخصي",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/fi-edit.svg",
    active: true,
    to: "/PatientProfile"
  },
  {
    label: "الخدمات المحفوظة",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-heart.svg",
    to: "/PatientProfile/savedServices"
  },
  {
    label: "تقييماتي",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-star.svg",
    to: "/PatientProfile/myReviews"
  },
  {
    label: "تسجيل الخروج",
    icon: "https://c.animaapp.com/miho59uz1FkFCT/img/u-exit.svg",
    danger: true,
  },
];
export const PatientProfileSideBar = () => {
  const navigate = useNavigate();
  const {logout ,user} = useAuth();

  return (
    <>
      <aside className="mt-[60px] lg:w-[30%] h-[472.8px] hidden lg:inline-flex items-center gap-1 p-1   animate-fade-in   [--animation-delay:400ms]">
        <Card className="flex flex-col w-80 h-[456.8px] items-start gap-8 pt-6 pb-0 px-6 bg-white rounded-[20px] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] border-0">
          <CardContent className="flex flex-col w-full p-0 gap-8">
            <div className="flex flex-col h-[160.8px] items-center justify-center gap-4 pt-0 pb-6 px-0 w-full border-b-[0.8px] [border-bottom-style:solid] border-[#f2f4f6]">
              <div className=" flex  h-24 w-24 rounded-full bg-Blue-900 text-white">

              <PatientImage Size="w-full h-full"/>
              </div>

              <div className="justify-center flex items-center gap-1 w-full">
                <h2 className="w-fit  font-Cairo font-normal text-[#1a2b45] text-2xl text-center leading-6 whitespace-nowrap [direction:rtl] tracking-[0]">
                 {user?.name}
                </h2>
              </div>
            </div>

            <nav className="flex flex-col items-start ">
              {profileMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex justify-end gap-1 px-8 py-2 w-full h-auto rounded-[20px] hover:bg-[#d3eaf8] transition-colors ${
                    item.active ? "bg-[#d3eaf8]" : ""
                  }`}
                 onClick={() => {
  if (item.label === "تسجيل الخروج") {
    logout();              
    navigate("/");    
  } else if (item.to) {
    navigate(item.to);
  }
}}
                >
                  <span
                    className={` font-Cairo text-xl font-normal text-left tracking-[0] leading-[normal] [direction:rtl] ${
                      item.danger ? "text-[#e7000b]" : "text-Blue-900"
                    }`}
                  >
                    {item.label}
                  </span>
                  <img
                    className="max-w-12 w-6 max-h-12 h-6"
                    alt={item.label}
                    src={item.icon}
                  />
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </aside>
      {/* <SideBarMobile/> */}
    </>
  );
}
