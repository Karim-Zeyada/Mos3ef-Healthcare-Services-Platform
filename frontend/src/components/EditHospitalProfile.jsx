/** @format */

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputFeild } from "./InputFeild";
import { UserIcon, MailIcon, Camera, Clock, MapPin, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Lock, Phone, MapPinned, Map } from "lucide-react";

export const EditHospitalProfile = () => {
  const { user, updateHospitalProfile, changePassword } = useAuth();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: user?.name || "",
      phone_Number: user?.phone_Number || "",
      address: user?.address || "",
      website: user?.website || "",
      description: user?.description || "",
      opening_Hours: user?.opening_Hours || "",
      region: user?.region || "",
      latitude: user?.latitude || "",
      longitude: user?.longitude || "",
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("من فضلك ادخلي جميع البيانات");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("كلمة المرور الجديدة غير مطابقة للتأكيد");
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    const result = await changePassword(data);

    if (result?.success) {
      alert("تم تغيير كلمة المرور بنجاح!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      alert(result?.message || "حدث خطأ ما");
    }
  };

  useEffect(() => {
    reset({
      name: user?.name || "",
      phone_Number: user?.phone_Number || "",
      address: user?.address || "",
      website: user?.website || "",
      description: user?.description || "",
      opening_Hours: user?.opening_Hours || "",
      region: user?.region || "",
      latitude: user?.latitude || "",
      longitude: user?.longitude || "",
    });
    setImagePreview(user?.profileImage || null);
  }, [user, reset]);
const getLocation = () => {
  if (!navigator.geolocation) {
    alert("المتصفح لا يدعم تحديد الموقع");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setValue("latitude", lat);
      setValue("longitude", lon);

      alert("تم تحديد الموقع بنجاح");
      console.log("Lat:", lat, "Lon:", lon);
    },
    (error) => {
      alert("فشل تحديد الموقع، تأكد من السماح للموقع.");
      console.error(error);
    }
  );
};
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      profileImage: selectedImage,
    };
    const result = await updateHospitalProfile(formData);

    if (result.success) {
      alert("تم تعديل البيانات بنجاح!");
      reset(result.updatedUser);
      setSelectedImage(null);
    } else {
      alert(result.message);
    }
  };

  return (
    <Card className="flex w-[95%] md:w-[80%] items-center justify-center my-2.5 mx-auto bg-white rounded-[20px] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] border-0 animate-fade-in [--animation-delay:200ms] ">
      <CardContent className="flex flex-col items-center gap-7 px-4 md:px-8 py-6 w-full">
        <div className="justify-end px-4 md:px-8 py-1 flex items-center gap-1 w-full">
          <h1 className="font-Cairo font-bold text-Blue-900 text-xl leading-6 whitespace-nowrap [direction:rtl] tracking-[0]">
            تعديل بيانات المستشفي
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-7 w-full"
        >
          <div className="w-[140px] h-[140px] flex items-center justify-center rounded-full bg-Blue text-white relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-16 h-16" />
            )}
            <input
              type="file"
              accept="image/*"
              id="profile-image"
              className="hidden"
              onChange={handleImageChange}
            />

            <div
              onClick={() => document.getElementById("profile-image").click()}
              className="absolute bottom-0 right-0 bg-Blue-900 p-2 rounded-full border-4 border-white cursor-pointer"
            >
              <Camera />
            </div>
          </div>

          <div className="flex flex-col items-start gap-7 w-full ">
            <div className="flex flex-col h-[76px] items-end gap-2 w-full">
              <Label className="flex items-center justify-end gap-1 p-1 w-full">
                <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                  اسم المستشفي
                </span>
              </Label>
              <InputFeild
                type="text"
                {...register("name")}
                icon={
                  <UserIcon className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                }
              />
            </div>

            <div className="flex flex-col items-end gap-2 w-full">
              <Label className="flex items-center justify-end gap-1 p-1 w-full">
                <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                  الوصف
                </span>
              </Label>
              <textarea
                {...register("description")}
                className="w-full min-h-[120px] px-5 py-4 rounded-xl border-2 border-[#d9d9d9] font-Cairo font-normal text-[#717182] text-sm text-right [direction:rtl] resize-none"
                placeholder="أدخل وصف المستشفى..."
              />
            </div>

            <div className="flex flex-col h-[76px] items-end gap-2 w-full">
              <Label className="flex items-center justify-end gap-1 p-1 w-full">
                <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                  الموقع الالكتروني
                </span>
              </Label>
              <InputFeild
                type="text"
                {...register("website")}
                icon={
                  <Globe className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                }
                placeholder="https://example.com"
              />
            </div>
            {/* البريد الإلكتروني
              <div className="flex flex-col h-[76px] items-end gap-2 w-full md:w-1/2">
                <Label className="flex items-center justify-end gap-1 p-1 w-full">
                  <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                    البريد الإلكتروني
                  </span>
                </Label>
                <InputFeild
                  type="email"
                  {...register("email")}
                  icon={
                    <MailIcon className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                  }
                />
              </div> */}

            <div className="flex flex-col md:flex-row items-start gap-4 w-full">
              <div className="flex flex-col h-[76px] items-end gap-2 w-full md:w-1/2">
                <Label className="flex items-center justify-end gap-1 p-1 w-full">
                  <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                    ساعات العمل
                  </span>
                </Label>
                <InputFeild
                  type="text"
                  {...register("opening_Hours")}
                  icon={
                    <Clock className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                  }
                  placeholder="9:00 ص - 5:00 م"
                />
              </div>
              <div className="flex flex-col h-[76px] items-end gap-2 w-full md:w-1/2">
                <Label className="flex items-center justify-end gap-1 p-1 w-full">
                  <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                    رقم الهاتف
                  </span>
                </Label>
                <InputFeild
                  type="tel"
                  {...register("phone_Number")}
                  icon={
                    <Phone className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                  }
                />
              </div>
            </div>

            <div className="flex flex-col h-[76px] items-end gap-2 w-full">
              <Label className="flex items-center justify-end gap-1 p-1 w-full">
                <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                  المنطقة
                </span>
              </Label>
              <InputFeild
                type="text"
                {...register("region")}
                icon={
                  <MapPin className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                }
              />
            </div>
            <input type="hidden" {...register("latitude")} />
            <input type="hidden" {...register("longitude")} />
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 w-full">
              <div className="flex flex-col h-[76px] items-end gap-2 w-full md:w-2/3">
                <Label className="flex items-center justify-end gap-1 p-1 w-full">
                  <span className="w-fit font-Cairo font-normal text-[#354152] text-base text-left tracking-[0] leading-5 whitespace-nowrap [direction:rtl]">
                    العنوان
                  </span>
                </Label>
                <InputFeild
                  type="text"
                  {...register("address")}
                  icon={
                    <MapPinned className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                  }
                />
              </div>

              <div className="flex w-full md:w-auto mt-5 md:mt-0">
                <Button
                  onClick={getLocation}
                  type="button"
                  className="h-12 w-full mt-3 md:w-auto bg-Blue-900 hover:bg-Blue-900/90 rounded-[20px] px-6 py-2 shadow-[0px_0px_4px_#f0d5a880] transition-colors"
                  size="lg"
                >
                  <span className="font-Cairo text-[#e9f5fb] text-lg [direction:rtl]">
                    حدد الموقع علي الخريطه
                  </span>
                  <Map className="w-5 h-5 mr-2" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full">
              <h3 className="font-Cairo font-bold text-Blue-900 text-lg [direction:rtl] w-full text-right">
                تغيير كلمة المرور
              </h3>

              <div className="flex flex-col md:flex-row items-start gap-4 w-full [direction:rtl]">
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <Label className="flex items-center gap-2 font-Cairo font-normal text-[#354152] text-sm [direction:rtl]">
                    كلمه المرور الحاليه
                  </Label>
                  <div className="relative">
                    <Input
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="h-auto flex items-center gap-2.5 px-5 py-4 rounded-xl border-2 border-[#d9d9d9] font-Cairo font-normal text-[#717182] text-sm text-right [direction:rtl] w-full"
                    />
                    <Lock className="w-5 h-5 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#d9d9d9]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <Label className="flex items-center gap-2 font-Cairo font-normal text-[#354152] text-sm [direction:rtl]">
                    كلمه المرور الجديده
                  </Label>
                  <div className="relative">
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="h-auto flex items-center gap-2.5 px-5 py-4 rounded-xl border-2 border-[#d9d9d9] font-Cairo font-normal text-[#717182] text-sm text-right [direction:rtl] w-full"
                    />
                    <Lock className="w-5 h-5 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#d9d9d9]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <Label className="flex items-center gap-2 font-Cairo font-normal text-[#354152] text-sm [direction:rtl]">
                    تاكيد كلمه المرور
                  </Label>
                  <div className="relative">
                    <Input
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="h-auto flex items-center gap-2.5 px-5 py-4 rounded-xl border-2 border-[#d9d9d9] font-Cairo font-normal text-[#717182] text-sm text-right [direction:rtl] w-full"
                    />
                    <Lock className="w-5 h-5 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#d9d9d9]" />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleChangePassword}
                variant="outline"
                className="flex justify-center gap-4 p-3 h-auto rounded-xl border border-solid border-Blue-900 hover:bg-transparent w-full md:w-auto"
              >
                <span className="font-Cairo text-Blue-900 text-base font-normal [direction:rtl]">
                  تغيير كلمة المرور
                </span>
              </Button>
            </div>

            <Button
              type="submit"
              className="flex h-16 justify-center gap-1 px-8 py-2 w-full bg-Blue-900 rounded-[20px] overflow-hidden shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue-900/90 transition-colors mt-4"
            >
              <span className="font-Cairo text-[#e9f5fb] text-xl font-normal [direction:rtl]">
                حفظ التغييرات
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
