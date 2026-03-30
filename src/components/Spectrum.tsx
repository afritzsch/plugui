import { useRef, useEffect } from 'react'

interface SpectrumProps {
  bins: number[]
  minDb?: number
  maxDb?: number
  width?: number
  height?: number
  color?: string
}

export function Spectrum({ bins, minDb = -100, maxDb = 0, width = 300, height = 80, color = '#a6e3a1' }: SpectrumProps) {
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

    // Grid lines at -24, -48, -72 dB
    ctx.strokeStyle = '#313244'
    ctx.lineWidth = 1
    for (const db of [-24, -48, -72]) {
      const y = ((maxDb - db) / (maxDb - minDb)) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    if (bins.length === 0) return

    const minBin = 1 // skip DC
    const maxBin = bins.length - 1

    // Map pixel x → interpolated dB using log scale
    const dbAtPixel = (px: number): number => {
      const binF  = minBin * Math.pow(maxBin / minBin, px / (width - 1))
      const lo    = Math.floor(binF)
      const hi    = Math.min(Math.ceil(binF), maxBin)
      const t     = binF - lo
      return bins[lo] * (1 - t) + bins[hi] * t
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, `${color}33`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(0, height)
    for (let px = 0; px < width; px++) {
      const y = Math.max(0, ((maxDb - dbAtPixel(px)) / (maxDb - minDb)) * height)
      ctx.lineTo(px, y)
    }
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fill()

    // Top line
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let px = 0; px < width; px++) {
      const y = Math.max(0, ((maxDb - dbAtPixel(px)) / (maxDb - minDb)) * height)
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
    }
    ctx.stroke()
  }, [bins, minDb, maxDb, width, height, color])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ borderRadius: 4, display: 'block' }}
    />
  )
}
