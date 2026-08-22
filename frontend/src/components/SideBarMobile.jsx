/** @format */

// Sidebar.jsx
import { SquarePen, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PatientImage } from './PatientImage';
export function SideBarMobile() {
  const items = [
    { icon: <PatientImage size="w-6 h-6"/> },
    { icon: <SquarePen className="w-6 h-6" />, to: "/PatientProfile" },
    {
      icon: <Heart className="w-6 h-6" />,
      to: "/PatientProfile/savedServices",
    },
    { icon: <Star className="w-6 h-6" />, to: "/PatientProfile/myReviews" },
  ];

  const navigate = useNavigate();
  return (
    <aside className="w-16   lg:hidden flex flex-col gap-3 items-center z-10 fixed right-0 ">
      {items.map((item, index) => (
        <button
          onClick={() => {
            if (item.to) {
              navigate(item.to);
            }
          }}
          key={index}
          className={`p-3 rounded-full hover:text-Blue-900 hover:bg-Blue transition ${
            index === 0 ? "bg-Blue-900 text-white" : ""
          }`}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
}
