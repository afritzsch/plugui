declare module 'juce-framework-frontend' {
  interface ListenerList {
    addListener(fn: () => void): number
    removeListener(id: number): void
  }

  interface SliderProperties {
    start: number
    end: number
    skew: number
    name: string
    label: string
    numSteps: number
    interval: number
    parameterIndex: number
  }

  interface SliderState {
    properties: SliderProperties
    valueChangedEvent: ListenerList
    propertiesChangedEvent: ListenerList
    getNormalisedValue(): number
    getScaledValue(): number
    setNormalisedValue(value: number): void
    sliderDragStarted(): void
    sliderDragEnded(): void
  }

  interface ToggleState {
    valueChangedEvent: ListenerList
    getValue(): boolean
    setValue(value: boolean): void
  }

  function getSliderState(name: string): SliderState
  function getToggleState(name: string): ToggleState
}
