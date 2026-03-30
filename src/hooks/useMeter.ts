import { useState, useEffect } from 'react'

interface MeterLevels {
  inputDb: number
  outputDb: number
}

export function useMeter(): MeterLevels {
  const [levels, setLevels] = useState<MeterLevels>({ inputDb: -100, outputDb: -100 })

  useEffect(() => {
    const backend = window.__JUCE__?.backend
    if (!backend) return

    const listenerId = backend.addEventListener('meterUpdate', (data) => {
      const { inputDb, outputDb } = data as unknown as MeterLevels
      setLevels({ inputDb, outputDb })
    })

    return () => backend.removeEventListener(listenerId)
  }, [])

  return levels
}
