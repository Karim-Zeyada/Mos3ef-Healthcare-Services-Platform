/** @format */

import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { InputFeild } from "../../components/InputFeild";
import { LoginImageSection } from "../../components/LoginImageSection";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
export const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      
      navigate("/");
  
    } else {
      alert(result.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };
  return (
    <>
      <div className="pt-28 mx-auto px-4 md:px-6 lg:px-36 ">
        <div className="w-full  flex items-center justify-between gap-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  w-full  items-center justify-center gap-4 "
          >
            <div className="flex-col w-80 md:w-full  max-w-[376px] justify-center gap-6 flex items-center">
              <div className="flex flex-col w-full items-start ">
                <h1 className="w-full text-center font-Cairo font-normal text-neutral-950 text-3xl tracking-[0] leading-9 [direction:rtl]">
                  مرحبا بك مجدداً{" "}
                </h1>
                <p className="w-full mt-1 text-center font-Cairo font-normal text-[#697282] text-base tracking-[0] leading-6 [direction:rtl]">
                  نحن سعداء برؤيتك مرة أخرى، أدخل عنوان بريدك الإلكتروني وكلمة
                  المرور{" "}
                </p>
              </div>
              <div className="flex flex-col w-full items-end">
                <InputFeild
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "البريد الإلكتروني غير صالح",
                    },
                  })}
                  type={"email"}
                  placeholder={"البريد الإلكتروني"}
                  icon={
                    <MailIcon className="absolute -translate-y-1/2 left-5 top-1/2 w-6 h-6 text-[#d9d9d9]" />
                  }
                />
                {errors.email && (
                  <p className="font-Cairo text-sm pr-1 m-0 text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full items-end">
                <div className="w-full relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    {...register("password", {
                      required: "كلمة المرور مطلوبة",
                    })}
                    className="w-full h-auto px-5 py-4 rounded-xl border-2 border-solid border-[#d9d9d9] text-right font-Cairo font-medium text-base focus-visible:ring-Blue-900 [direction:rtl]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="  absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d9d9d9] hover: text-Blue-900 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-6 h-6 text-[#d9d9d9]" />
                    ) : (
                      <EyeIcon className="  w-6 h-6 text-[#d9d9d9]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-Cairo text-sm pr-1 m-0 text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button className="h-16 w-full px-8 py-2 bg-Blue-900 hover:bg-[#0a2838] rounded-[20px] overflow-hidden shadow-[0px_0px_4px_#f0d5a880] transition-colors">
                <span className="font-Cairo font-normal text-[#e9f5fb] text-xl tracking-[0] leading-[normal] [direction:rtl]">
                  تسجيل الدخول
                </span>
              </Button>
              <div className="inline-flex items-center gap-5 w-full">
                <div className="flex-1 h-px bg-[#8e8e93]" />
                <span className="[font-family:'Inter',Helvetica] font-light text-[#8e8e93] text-xl tracking-[0] leading-[normal] [direction:rtl]">
                  أو
                </span>
                <div className="flex-1 h-px bg-[#8e8e93]" />
              </div>

              <div className="flex flex-col items-center justify-center gap-2 w-full">
                <Button className="h-16 w-full px-8 py-2 border border-Blue-900 hover:bg-gray-300 rounded-[20px] overflow-hidden bg-white transition-colors">
                  <Link
                    to="/SignUp"
                    className="font-Cairo font-normal text-Blue-900 text-xl tracking-[0] leading-[normal] [direction:rtl]"
                  >
                    انشاء حساب جديد
                  </Link>
                </Button>
                <Button className="h-16 w-full px-8 py-2 border border-Blue-900 hover:bg-gray-300 rounded-[20px] overflow-hidden bg-white transition-colors">
                  <Link
                    to="/SignUp-Hospital"
                    className="font-Cairo font-normal text-Blue-900 text-xl tracking-[0] leading-[normal] [direction:rtl]"
                  >
                    انضم لنا كشريك طبي
                  </Link>
                </Button>
              </div>
            </div>
          </form>
          <LoginImageSection />
        </div>
      </div>
    </>
  );
};
