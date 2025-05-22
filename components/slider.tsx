"use client"

import * as React from "react"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min: number
  max: number
  step?: number
}

export function Slider({
  value,
  onValueChange,
  min,
  max,
  step = 1,
}: SliderProps) {
  return (
    <div className="w-full">
      <input
        type="range"
        value={value[0]}
        onChange={(e) => onValueChange([Number(e.target.value)])}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
    </div>
  )
}
