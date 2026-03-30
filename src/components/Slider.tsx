import { useRef } from 'react'

interface SliderProps {
  value: number
  min: number
  max: number
  label?: string
  isVertical: boolean
  onChange: (value: number) => void
  onDragStart?: () => void
}

export function Slider({ value, min, max, label, isVertical, onChange, onDragStart }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const percent = ((value - min) / (max - min)) * 100

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onDragStart?.()
    updateValue(e)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return
    updateValue(e)
  }

  const updateValue = (e: React.PointerEvent) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const norm = isVertical
      ? 1 - (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width
    onChange(min + Math.max(0, Math.min(1, norm)) * (max - min))
  }

  return (
    <div className="slider-wrap">
      {label && <div className="slider-label">{label}</div>}
      <div
        ref={trackRef}
        className={`slider-track ${isVertical ? 'slider-track--vertical' : 'slider-track--horizontal'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div
          className="slider-fill"
          style={isVertical ? { height: `${percent}%` } : { width: `${percent}%` }}
        />
        <div
          className="slider-thumb"
          style={isVertical
            ? { bottom: `calc(${percent}% - 8px)` }
            : { left:   `calc(${percent}% - 8px)` }}
        />
      </div>
    </div>
  )
}
