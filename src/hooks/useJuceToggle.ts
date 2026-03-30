import { useState, useEffect } from 'react'
import * as Juce from 'juce-framework-frontend'

interface JuceToggleControls {
  value: boolean
  onChange: (value: boolean) => void
}

export function useJuceToggle(identifier: string): JuceToggleControls {
  const toggleState = Juce.getToggleState(identifier)
  const [value, setValue] = useState(toggleState.getValue())

  useEffect(() => {
    const id = toggleState.valueChangedEvent.addListener(() =>
      setValue(toggleState.getValue())
    )
    return () => toggleState.valueChangedEvent.removeListener(id)
  }, [toggleState])

  return {
    value,
    onChange: (v: boolean) => {
      toggleState.setValue(v)
      setValue(v)
    },
  }
}
