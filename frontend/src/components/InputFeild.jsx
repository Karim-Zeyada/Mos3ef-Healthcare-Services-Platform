import React from 'react'
import { Input } from './ui/input'

export const InputFeild = ({ icon, type, placeholder,value, ...props }) => {
  return (
    <div className="w-full relative">
      <Input
        {...props}
        type={type || "text"}
        placeholder={placeholder || ""}
        defaultValue={value || ""}
        className={`w-full h-auto px-5 py-4 rounded-xl border-2 border-solid border-[#d9d9d9] text-right font-Cairo font-medium text-base focus-visible:ring-Blue-900 ${
          type !== "phone" && "[direction:rtl]"
        } `}
      />
      {icon}
    </div>
  );
};


