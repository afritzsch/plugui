import { Progress } from '@mantine/core'

interface MeterProps {
  value: number
  min: number
  max: number
  label?: string
  color?: string
  height?: number
  width?: number
  ticks?: number[]
}

export function Meter({ value, min, max, label, color, height = 150, width = 14, ticks }: MeterProps) {
  const percent = Math.max(0, Math.min(100,
    ((value - min) / (max - min)) * 100
  ))

  return (
    <div className="meter-wrap">
      {label && <div className="meter-label">{label}</div>}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <div className="meter-bar-wrap" style={{ width, height }}>
          <Progress
            value={percent}
            color={color}
            className="meter-bar"
            style={{ width: height, height: width }}
            radius="xs"
          />
        </div>
        {ticks && (
          <div className="meter-ticks" style={{ height }}>
            {ticks.map(tick => {
              const pct = ((tick - min) / (max - min)) * 100
              return (
                <div key={tick} className="meter-tick" style={{ bottom: `${pct}%` }}>
                  <div className="meter-tick-line" />
                  <span className="meter-tick-label">{tick}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
