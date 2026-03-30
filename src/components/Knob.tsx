import { useState } from 'react'
import { RingProgress, NumberInput, Text } from '@mantine/core'

interface KnobProps {
  value: number
  min: number
  max: number
  label?: string
  valueTemplate: string
  onChange: (value: number) => void
  onDragStart?: () => void
  size?: number
}

export function Knob({ value, min, max, label, valueTemplate, onChange, onDragStart, size = 80 }: KnobProps) {
  const [editing, setEditing] = useState(false)
  const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  const commitEdit = (val: number | string) => {
    const n = typeof val === 'number' ? val : parseFloat(String(val))
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)))
    setEditing(false)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onDragStart?.()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return
    const delta = -e.movementY / 200
    onChange(Math.max(min, Math.min(max, value + delta * (max - min))))
  }

  return (
    <div className="knob-wrap">
      <div
        className="knob-inner"
        style={{ width: size, height: size }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <RingProgress
          size={size}
          thickness={size * 0.1}
          roundCaps
          sections={[{ value: percent, color: 'blue.6' }]}
          label={
            <div className="knob-overlay" onPointerDown={(e) => e.stopPropagation()}>
              {editing ? (
                <NumberInput
                  className="knob-value-input"
                  defaultValue={parseFloat(value.toFixed(1))}
                  min={min}
                  max={max}
                  step={0.1}
                  decimalScale={1}
                  hideControls
                  size="xs"
                  autoFocus
                  onBlur={(e) => commitEdit(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')  commitEdit((e.target as HTMLInputElement).value)
                    if (e.key === 'Escape') setEditing(false)
                  }}
                />
              ) : (
                <Text className="knob-value" size="xs" onClick={() => setEditing(true)}>
                  {valueTemplate}
                </Text>
              )}
            </div>
          }
        />
      </div>
      {label && <div className="knob-label">{label}</div>}
    </div>
  )
}
