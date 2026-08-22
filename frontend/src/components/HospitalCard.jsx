/** @format */

import React from "react";
import { ChartLine, MoreVerticalIcon, PhoneOutgoing, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { HeaderOfService } from "./HeaderOfService";
import { IconButton } from "./IconButton";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { MapPinPlusInside } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCompare from "../hooks/useCompare";
import { getServiceImage } from "../utils/imageHelper";

export const HospitalCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCompare, isInCompare } = useCompare();

  if (!item) return null;

  const handleClick = () => {
    navigate(`/service-details/${item.serviceId}`);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    addToCompare(item);
  };

  const handleCall = (e) => {
    e.stopPropagation();
    if (item.hospitalPhone || item.phone_Number) {
      window.location.href = `tel:${item.hospitalPhone || item.phone_Number}`;
    }
  };

  const alreadyInCompare = isInCompare(item.serviceId);
  const imageUrl = getServiceImage(item.hospitalImage, item.category);

  return (
    <Card
      onClick={handleClick}
      className="inline-flex flex-col items-center justify-center gap-4 pt-2 pb-3 px-2 bg-white rounded-[20px] shadow-[0_0_2px_0_rgba(0,0,0,0.95)] cursor-pointer hover:shadow-lg transition-all duration-200 w-full max-w-[280px]"
      data-model-id="4:98"
    >
      <CardContent className="p-0 w-full space-y-4">
        <HeaderOfService
          image={imageUrl}
          name={item.hospitalName}
          rating={item.averageRating?.toFixed(1) || "—"}
          serviceId={item.serviceId}
          isOnline={
            item.availability === "available" ||
            item.availability === "متاح" ||
            item.availability === "yes" ||
            item.availability === "نعم"
          }
        />
        <div className="flex justify-end gap-2 px-2 w-full items-center flex-wrap">
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-[10px] tracking-[0] leading-[normal] [direction:rtl]">
              {item.price > 0 ? `سعر الكشف ${item.price} ج.م` : "مجاني / تأمين"}
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-[10px] tracking-[0] leading-[normal] [direction:rtl]">
              {item.distanceKm ? `تبعد ${item.distanceKm.toFixed(1)} كم` : item.categoryName || "خدمة طبية"}
            </span>
            <MapPinPlusInside className="w-3.5 h-3.5 text-Blue" />
          </Badge>

          <Badge
            variant="outline"
            className="inline-flex bg-Blue-200 justify-center gap-1 items-center border-0 rounded-3xl shadow-none max-w-full"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-xs tracking-[0] leading-[normal] [direction:rtl] truncate">
              {item.name}
            </span>
          </Badge>
        </div>
        <footer className="inline-flex items-center justify-center gap-2 w-full pt-1">
          <div onClick={handleCompare}>
            <ButtonTextAndIcon
              text={alreadyInCompare ? "تمت الإضافة ✓" : "اضف للمقارنة"}
              icon={
                alreadyInCompare ? (
                  <Check className="w-4 h-4 text-Green" />
                ) : (
                  <ChartLine className="w-4 h-4" />
                )
              }
            />
          </div>
          <div onClick={handleCall}>
            <IconButton
              IconName={<PhoneOutgoing className="w-4 h-4" />}
              label="Call hospital"
            />
          </div>
          <IconButton
            IconName={<MoreVerticalIcon className="w-4 h-4 text-white" />}
            label="More options"
          />
        </footer>
      </CardContent>
    </Card>
  );
};
