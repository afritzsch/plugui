import { useState, useEffect } from 'react'

export function useWaveform(eventId: string): number[] {
  const [samples, setSamples] = useState<number[]>([])

  useEffect(() => {
    const backend = window.__JUCE__?.backend
    if (!backend) return

    const listenerId = backend.addEventListener(eventId, (data) => {
      const { samples } = data as unknown as { samples: number[] }
      setSamples(samples)
    })

    return () => backend.removeEventListener(listenerId)
  }, [eventId])

  return samples
}
