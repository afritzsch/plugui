import { useState, useEffect } from 'react'

export function useSpectrum(eventId: string): number[] {
  const [bins, setBins] = useState<number[]>([])

  useEffect(() => {
    const backend = window.__JUCE__?.backend
    if (!backend) return

    const listenerId = backend.addEventListener(eventId, (data) => {
      const { bins } = data as unknown as { bins: number[] }
      setBins(bins)
    })

    return () => backend.removeEventListener(listenerId)
  }, [eventId])

  return bins
}
