import React from 'react'
import { Button } from './ui/button'

export const ButtonTextAndIcon = ({ text, icon }) => {
    return (
        <Button
            variant="outline"
            className="inline-flex items-center justify-center gap-1 px-4 py-1 h-auto rounded-3xl border border-solid border-Blue-900 hover:border-Blue-200 hover:text-Blue-200 focus:border-Blue focus:text-Blue bg-transparent transition-colors">
            <span className="w-fit -mt-px font-Cairo font-normal text-base text-left tracking-[0] leading-[normal] [direction:rtl]">
                {text}
            </span>
            {icon}
        </Button>
    )
}
