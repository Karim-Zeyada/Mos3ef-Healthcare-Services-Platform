import { SquarePen, Heart, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { PatientImage } from './PatientImage';

export function SideBarMobile() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteActive = (to) => {
    if (!to) return false;
    if (to === "/PatientProfile") {
      return location.pathname === "/PatientProfile" || location.pathname === "/PatientProfile/";
    }
    return location.pathname === to || location.pathname.startsWith(to);
  };

  const items = [
    { icon: <PatientImage size="w-6 h-6" />, isAvatar: true },
    { icon: <SquarePen className="w-6 h-6" />, to: "/PatientProfile" },
    {
      icon: <Heart className="w-6 h-6" />,
      to: "/PatientProfile/savedServices",
    },
    { icon: <Star className="w-6 h-6" />, to: "/PatientProfile/myReviews" },
  ];

  return (
    <aside className="w-16 lg:hidden flex flex-col gap-3 items-center z-10 fixed right-2 top-24 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-md border border-gray-100">
      {items.map((item, index) => {
        const active = isRouteActive(item.to);

        return (
          <button
            onClick={() => {
              if (item.to) {
                navigate(item.to);
              }
            }}
            key={index}
            className={`p-3 rounded-full transition-all duration-200 cursor-pointer ${
              item.isAvatar
                ? "bg-Blue-900 text-white shadow-xs"
                : active
                ? "bg-[#d3eaf8] text-Blue-900 ring-2 ring-Blue/30 shadow-xs"
                : "text-gray-600 hover:bg-Blue-50 hover:text-Blue-900"
            }`}
          >
            {item.icon}
          </button>
        );
      })}
    </aside>
  );
}

