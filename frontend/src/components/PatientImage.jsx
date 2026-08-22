/** @format */

import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { UserIcon } from "lucide-react";

export const PatientImage = ({ size, previewImage }) => {
  const { user } = useAuth();

  // إذا كانت هناك صورة معاينة (مؤقتة)
  if (previewImage) {
    return <img className={size} alt="Profile preview" src={previewImage} />;
  }

  // إذا كانت هناك صورة مستخدم كاملة الرابط
  if (user?.imageUrl) {
    return (
      <img
        className={`${size}  rounded-full object-cover`}
        alt={user.name}
        src={user.imageUrl}
      />
    );
  }

  // إذا لم توجد صورة
  return <UserIcon className= {`${size} m-auto`} />;
};
