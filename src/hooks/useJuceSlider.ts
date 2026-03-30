import { useState, useEffect, useRef } from 'react'
import * as Juce from 'juce-framework-frontend'

interface SliderProperties {
  start: number
  end: number
  interval: number
}

interface JuceSliderControls {
  normalisedValue: number
  scaledValue: number
  properties: SliderProperties
  onChange: (normalisedValue: number) => void
  onScaledChange: (scaledValue: number) => void
  onDragStart: () => void
}

export function useJuceSlider(identifier: string): JuceSliderControls {
  const sliderState = Juce.getSliderState(identifier)
  const [normalisedValue, setNormalisedValue] = useState(sliderState.getNormalisedValue())
  const dragging = useRef(false)

  const props = sliderState.properties
  const properties: SliderProperties = {
    start: props.start,
    end: props.end,
    interval: props.interval,
  }

  // Keep in sync with DAW automation
  useEffect(() => {
    const id = sliderState.valueChangedEvent.addListener(() =>
      setNormalisedValue(sliderState.getNormalisedValue())
    )
    return () => sliderState.valueChangedEvent.removeListener(id)
  }, [sliderState])

  // Notify JUCE when the drag ends — pointerup can fire outside the element
  useEffect(() => {
    const onPointerUp = () => {
      if (!dragging.current) return
      dragging.current = false
      sliderState.sliderDragEnded()
    }
    window.addEventListener('pointerup', onPointerUp)
    return () => window.removeEventListener('pointerup', onPointerUp)
  }, [sliderState])

  const onChange = (v: number) => {
    sliderState.setNormalisedValue(v)
    setNormalisedValue(v)
  }

  const onScaledChange = (scaled: number) => {
    const range = properties.end - properties.start
    const normalised = range === 0 ? 0 : (scaled - properties.start) / range
    onChange(Math.max(0, Math.min(1, normalised)))
  }

  return {
    normalisedValue,
    scaledValue: sliderState.getScaledValue(),
    properties,
    onChange,
    onScaledChange,
    onDragStart: () => {
      dragging.current = true
      sliderState.sliderDragStarted()
    },
  }
}
