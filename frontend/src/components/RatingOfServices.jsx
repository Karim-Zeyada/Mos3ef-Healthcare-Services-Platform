import { StarIcon } from 'lucide-react'
import React from 'react'

export const RatingOfServices = ({rating}) => {
  return (
      <div className="inline-flex h-5 items-start justify-center gap-1 ">
          <span className="w-fit -mt-0.5 mb-[-5.00px] font-normal text-right font-Cairo text-Blue-900 text-sm tracking-[0] leading-[normal]">
              {rating}
          </span>
          <StarIcon className="w-[24.67px] h-[27.83px] mt-[-1.50px] mb-[-6.33px] mr-[-2.33px] fill-yellow-400 text-yellow-400" />
      </div>

  )
}
