/** @format */

import React, { useState } from "react";
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
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "react-hook-form";

export const SignUpHospital = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerHospital } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم تحديد الموقع الجغرافي");
      return;
    }

    setIsLocating(true);
    setLocationStatus(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setValue("latitude", lat);
        setValue("longitude", lon);

        setIsLocating(false);
        setLocationStatus("تم تحديد الإحداثيات بنجاح");
      },
      (error) => {
        setIsLocating(false);
        alert("فشل تحديد الموقع، يُرجى التأكد من تفعيل إذن الوصول للموقع.");
        console.error(error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const onSubmit = async (data) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name?.trim(),
        email: data.email?.trim(),
        address: data.address?.trim(),
        phoneNumber: data.phoneNumber?.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
      };

      const res = await registerHospital(payload);

      if (res.success) {
        alert("تم تسجيل المنشأة الطبية بنجاح! يمكنك الآن تسجيل الدخول.");
        navigate("/LogIn");
      } else {
        setServerError(res.message || "حدث خطأ أثناء التسجيل، حاول مرة أخرى");
      }
    } catch (err) {
      setServerError("حدث خطأ غير متوقع في الاتصال بالخادم");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 mx-auto px-4 md:px-6 lg:px-36 w-full flex justify-center">
      <section className="flex w-full md:w-4xl justify-center items-start py-6 bg-white">
        <Card className="w-full rounded-3xl shadow-[0px_25px_50px_-12px_#00000040] animate-fade-in border border-gray-100">
          <CardContent className="p-6 md:p-12">
            <div className="flex flex-col gap-8">
              <header className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-Blue-50 flex items-center justify-center text-Blue-900 shadow-xs">
                  <Hospital className="w-10 h-10 text-Blue-900" />
                </div>

                <h1 className="font-Cairo font-bold text-Blue-900 text-2xl md:text-3xl leading-tight [direction:rtl]">
                  انضم كشريك طبي في مسعف
                </h1>

                <p className="font-Cairo text-gray-600 text-base max-w-lg leading-relaxed [direction:rtl]">
                  سجل منشأتك الطبية (مستشفى / مجمع طبي) وساهم في تقديم رعاية صحية متميزة للمرضى.
                </p>
              </header>

              {serverError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 [direction:rtl]">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span className="font-Cairo text-sm">{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <input type="hidden" {...register("latitude")} />
                <input type="hidden" {...register("longitude")} />

                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [direction:rtl]">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5 text-right">
                    <Label htmlFor="hospital-name" className="font-Cairo font-medium text-gray-700 text-sm">
                      اسم المنشأة الطبية <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="hospital-name"
                        placeholder="مستشفى الشفاء التخصصي"
                        className={`h-12 px-4 pr-11 rounded-xl border font-Cairo text-sm text-right ${
                          errors.name ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                        }`}
                        {...register("name", {
                          required: "اسم المنشأة الطبية مطلوب",
                          minLength: { value: 3, message: "يجب أن يكون الاسم 3 أحرف على الأقل" },
                        })}
                      />
                      <Hospital className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-red-500 font-Cairo">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 text-right">
                    <Label htmlFor="hospital-email" className="font-Cairo font-medium text-gray-700 text-sm">
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="hospital-email"
                        type="email"
                        dir="ltr"
                        placeholder="info@hospital.com"
                        className={`h-12 px-4 pr-11 rounded-xl border font-Cairo text-sm text-right ${
                          errors.email ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                        }`}
                        {...register("email", {
                          required: "البريد الإلكتروني مطلوب",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "صيغة البريد الإلكتروني غير صحيحة",
                          },
                        })}
                      />
                      <Mail className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-red-500 font-Cairo">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="flex flex-col gap-1.5 text-right [direction:rtl]">
                  <Label htmlFor="hospital-phone" className="font-Cairo font-medium text-gray-700 text-sm">
                    رقم الهاتف / الخط الساخن <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="hospital-phone"
                      type="tel"
                      dir="ltr"
                      placeholder="01012345678"
                      className={`h-12 px-4 pr-11 rounded-xl border font-Cairo text-sm text-right ${
                        errors.phoneNumber ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                      }`}
                      {...register("phoneNumber", {
                        required: "رقم الهاتف مطلوب",
                        pattern: {
                          value: /^[+0-9\s-]{7,20}$/,
                          message: "صيغة رقم الهاتف غير صحيحة",
                        },
                      })}
                    />
                    <Phone className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-xs text-red-500 font-Cairo">{errors.phoneNumber.message}</span>
                  )}
                </div>

                {/* Row 3: Address & Location */}
                <div className="flex flex-col gap-1.5 text-right [direction:rtl]">
                  <Label htmlFor="hospital-address" className="font-Cairo font-medium text-gray-700 text-sm">
                    العنوان التفصيلي <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        id="hospital-address"
                        placeholder="المدينة، الحي، اسم الشارع"
                        className={`h-12 px-4 pr-11 rounded-xl border font-Cairo text-sm text-right ${
                          errors.address ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                        }`}
                        {...register("address", {
                          required: "العنوان مطلوب",
                        })}
                      />
                      <MapPinned className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    <Button
                      type="button"
                      onClick={getLocation}
                      disabled={isLocating}
                      className="h-12 bg-Blue-50 hover:bg-Blue-100 text-Blue-900 border border-Blue-200 rounded-xl px-5 transition-colors shrink-0 flex items-center justify-center gap-2 font-Cairo text-sm"
                    >
                      {isLocating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-Blue-900" />
                          <span>جاري التحديد...</span>
                        </>
                      ) : (
                        <>
                          <Map className="w-4 h-4 text-Blue-900" />
                          <span>تحديد الموقع (GPS)</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {locationStatus && (
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-Cairo mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{locationStatus}</span>
                    </div>
                  )}

                  {errors.address && (
                    <span className="text-xs text-red-500 font-Cairo">{errors.address.message}</span>
                  )}
                </div>

                {/* Row 4: Password and Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [direction:rtl]">
                  {/* Password */}
                  <div className="flex flex-col gap-1.5 text-right">
                    <Label htmlFor="hospital-password" className="font-Cairo font-medium text-gray-700 text-sm">
                      كلمة المرور <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="hospital-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`h-12 px-4 pr-11 pl-11 rounded-xl border font-Cairo text-sm text-right ${
                          errors.password ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                        }`}
                        {...register("password", {
                          required: "كلمة المرور مطلوبة",
                          minLength: { value: 6, message: "يجب ألا تقل كلمة المرور عن 6 أحرف" },
                        })}
                      />
                      <Lock className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 hover:text-gray-600 p-1"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-xs text-red-500 font-Cairo">{errors.password.message}</span>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5 text-right">
                    <Label htmlFor="hospital-confirmPassword" className="font-Cairo font-medium text-gray-700 text-sm">
                      تأكيد كلمة المرور <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="hospital-confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`h-12 px-4 pr-11 pl-11 rounded-xl border font-Cairo text-sm text-right ${
                          errors.confirmPassword ? "border-red-500 focus-visible:ring-red-400" : "border-gray-200"
                        }`}
                        {...register("confirmPassword", {
                          required: "تأكيد كلمة المرور مطلوب",
                          validate: (val) => val === passwordValue || "كلمة المرور غير متطابقة",
                        })}
                      />
                      <Lock className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 hover:text-gray-600 p-1"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500 font-Cairo">{errors.confirmPassword.message}</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 mt-4 w-full bg-Blue-900 hover:bg-Blue-900/90 text-white rounded-2xl shadow-md transition-all font-Cairo text-base font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري تسجيل المنشأة...</span>
                    </>
                  ) : (
                    <span>تسجيل المنشأة الطبية</span>
                  )}
                </Button>

                {/* Footer Links */}
                <div className="flex items-center justify-center gap-2 [direction:rtl] mt-2">
                  <span className="font-Cairo text-gray-600 text-sm">
                    شريك بالفعل؟
                  </span>
                  <Link
                    to="/LogIn"
                    className="font-Cairo text-Blue-900 font-semibold text-sm hover:underline transition-colors"
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

