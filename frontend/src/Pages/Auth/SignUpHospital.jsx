/** @format */

import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Lock,
  MapPinned,
  Phone,
  Hospital,
  Mail,
  EyeIcon,
  EyeOffIcon,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const formFields = [
  {
    row: 1,
    fields: [
      {
        id: "email",
        label: "البريد الإلكتروني",
        placeholder: "info@hospital.com",
        icon: (
          <Mail className="absolute text-gray-300 top-1/2 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
      },
      {
        id: "name",
        label: "اسم المنشأة الطبية",
        placeholder: "مستشفى الشفاء",
        icon: (
          <Hospital className="absolute top-1/2 text-gray-300 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
      },
    ],
  },
  {
    row: 3,
    fields: [
      {
        id: "address",
        label: "العنوان",
        placeholder: "كفر الشيخ،حي 47، شارع المصنع",
        icon: (
          <MapPinned className="absolute top-1/2 text-gray-300 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
        hasButton: true,
      },
    ],
  },
  {
    row: 4,
    fields: [
      {
        id: "phoneNumber",
        label: "رقم الهاتف",
        placeholder: "+966 50 123 4567",
        icon: (
          <Phone className="absolute top-1/2 text-gray-300 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
      },
    ],
  },
  {
    row: 5,
    fields: [
      {
        id: "confirmPassword",
        label: "تأكيد كلمة المرور",
        placeholder: "••••••••",
        icon: (
          <Lock className="absolute top-1/2 text-gray-300 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
        type: "password",
        hasEyeIcon: true,
      },
      {
        id: "password",
        label: "كلمة المرور",
        placeholder: "••••••••",
        icon: (
          <Lock className="absolute top-1/2 text-gray-300 -translate-y-1/2 right-5 w-6 h-6 pointer-events-none" />
        ),
        type: "password",
        hasEyeIcon: true,
      },
    ],
  },
];

export const SignUpHospital = () => {
  const [showPassword, setPassword] = useState(false);
  const { registerHospital } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    const res = await registerHospital(data);

    if (res.success) {
      alert("تم تسجيل المنشأة بنجاح");
      navigate("/LogIn");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="pt-18 mx-auto px-4 md:px-6 lg:px-36 w-full flex justify-center">
      <section className="flex w-full md:w-4xl justify-center items-start py-[60px] bg-white">
        <Card className="w-full rounded-3xl shadow-[0px_25px_50px_-12px_#00000040] animate-fade-in">
          <CardContent className="p-4 md:p-12">
            <div className="flex flex-col gap-8">
              <header className="flex flex-col items-center gap-6">
                <img
                  className="w-20 h-20"
                  alt="Hospital icon"
                  src="https://c.animaapp.com/mija7lw2PDHAdo/img/container.svg"
                />

                <h1 className="font-Cairo font-bold text-[#1a2b45] text-xl text-center leading-6 [direction:rtl]">
                  انضم كشريك طبي في مسعف
                </h1>

                <p className="font-Cairo font-bold text-[#495565] text-base text-center leading-6 [direction:rtl]">
                  سجل منشأتك الطبية وساعد آلاف المرضى في الوصول إليك.
                </p>
              </header>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6">
                <input type="hidden" {...register("latitude")} />
                <input type="hidden" {...register("longitude")} />

                {formFields.map((rowData, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="flex flex-col md:flex-row items-end justify-end gap-4"
                  >
                    {rowData.fields[0].hasButton && (
                      <div className="w-full md:w-auto mb-2 md:mb-0">
                        <Button
                          type="button"
                          onClick={getLocation}
                          className="h-12 mb-2 w-full md:w-auto bg-Blue-900 hover:bg-Blue-900/90 rounded-[20px] px-8 py-2 shadow-[0px_0px_4px_#f0d5a880] transition-colors"
                          size="lg"
                        >
                          <span className="font-Cairo text-[#e9f5fb] text-xl [direction:rtl]">
                            حدد الموقع علي الخريطه
                          </span>
                          <Map className="w-6 h-6 mr-2" />
                        </Button>
                      </div>
                    )}

                    <div
                      className={`flex flex-col md:flex-row gap-4 ${
                        rowData.fields.length === 1
                          ? "w-full"
                          : "w-full md:flex-row"
                      }`}
                    >
                      {rowData.fields.map((field, fieldIndex) => (
                        <div
                          key={`field-${rowIndex}-${fieldIndex}`}
                          className={`flex flex-col gap-2 ${
                            rowData.fields.length === 1
                              ? "w-full"
                              : "w-full md:w-1/2"
                          }`}
                        >
                          <Label
                            htmlFor={`field-${rowIndex}-${fieldIndex}`}
                            className="flex items-center gap-2 h-3.5 font-Cairo font-normal text-[#354152] text-sm [direction:rtl]"
                          >
                            {field.label}
                          </Label>

                          <div className="relative">
                            <Input
                              id={`field-${rowIndex}-${fieldIndex}`}
                              {...register(field.id)}
                              type={
                                field.type == "password"
                                  ? showPassword
                                    ? "text"
                                    : "password"
                                  : field.type || "text"
                              }
                              placeholder={field.placeholder}
                              className="h-auto flex items-center gap-2.5 px-5 py-4 rounded-xl border-2 border-[#d9d9d9] font-Cairo font-normal text-[#717182] text-sm text-right [direction:rtl] w-full"
                              style={{ paddingRight: "3rem" }}
                            />
                            {field.icon}
                            {field.hasEyeIcon && (
                              <button
                                type="button"
                                onClick={() => setPassword(!showPassword)}
                                className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4"
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="w-6 h-6 text-[#d9d9d9]" />
                                ) : (
                                  <EyeIcon className="w-6 h-6 text-[#d9d5d9]" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Button
                  type="submit"
                  className="h-auto w-full bg-Blue-900 hover:bg-Blue-900/90 rounded-[20px] px-8 py-2 shadow-[0px_0px_4px_#f0d5a880] transition-colors"
                  size="lg"
                >
                  <span className="font-Cairo text-white text-lg leading-7 [direction:rtl]">
                    تسجيل المنشأة
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-2 [direction:rtl]">
                  <span className="font-Cairo font-normal text-[#495565] text-base text-center">
                    شريك بالفعل؟
                  </span>
                  <Link
                    to="/LogIn"
                    className="font-Cairo font-normal text-[#1e79ae] text-base text-center hover:underline transition-colors"
                  >
                    تسجيل الدخول من هنا
                  </Link>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
