import React from 'react'
import { Card, CardContent } from './ui/card'
import { StarIcon } from 'lucide-react';

export const ReviewCard = ({ name, describe, rating = 5, date }) => {
  return (
    <Card className="bg-Blue text-white [direction:rtl] rounded-3xl border-0 shadow-md">
      <CardContent className="flex flex-col items-center justify-start gap-4">
        <h2 className="font-Cairo font-semibold text-base">{name}</h2>
        <p className="font-Cairo text-sm text-center leading-relaxed">{describe}</p>
        <div className="inline-flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-400/40 text-gray-400/40"
              }`}
            />
          ))}
        </div>
        {date && (
          <p className="font-Cairo text-xs text-white/70">
            {new Date(date).toLocaleDateString("ar-EG")}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
