import { useRef, useEffect } from 'react'

interface WaveformProps {
  samples: number[]
  width?: number
  height?: number
  color?: string
}

export function Waveform({ samples, width = 200, height = 80, color = '#74c7ec' }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = '#11111b'
    ctx.fillRect(0, 0, width, height)

    // Zero line
    ctx.strokeStyle = '#313244'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    if (samples.length === 0) return

    // Waveform
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.beginPath()
    samples.forEach((s, i) => {
      const x = (i / (samples.length - 1)) * width
      const y = (1 - (s + 1) / 2) * height
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()
  }, [samples, width, height, color])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ borderRadius: 4, display: 'block' }}
    />
  )
}
