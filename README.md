# plugui

React UI component library for JUCE audio plugins. Built with [Mantine](https://mantine.dev) and [juce-framework-frontend](https://github.com/juce-framework/JUCE).

## Components

| Component | Description |
|-----------|-------------|
| `Knob` | Rotary control with pointer drag and inline value editing |
| `Slider` | Horizontal or vertical slider with pointer events |
| `Meter` | Level meter with optional dB tick marks |
| `ToggleButton` | Power-style toggle (e.g. bypass) |

## Hooks

| Hook | Description |
|------|-------------|
| `useJuceSlider(id)` | Binds a React control to a JUCE `WebSliderRelay` |
| `useJuceToggle(id)` | Binds a React control to a JUCE `WebToggleButtonRelay` |
| `useMeter()` | Subscribes to `meterUpdate` backend events |

## Usage

Used as a git submodule inside a plugin's `ui/` directory.

```sh
# In your plugin repo
git submodule add https://github.com/<you>/plugui.git ui/plugui
```

Then in `ui/package.json`:
```json
"dependencies": {
  "plugui": "file:./plugui"
}
```

Import in your plugin UI:
```tsx
import { Knob, useJuceSlider } from 'plugui'

export default function App() {
  const gain = useJuceSlider('gainSlider')
  return <Knob value={gain.scaledValue} ... />
}
```

## Peer dependencies

Your plugin's `ui/package.json` must provide:

- `react` >= 18
- `react-dom` >= 18
- `@mantine/core` >= 8
- `@mantine/hooks` >= 8
- `@tabler/icons-react` >= 3
- `juce-framework-frontend` (local path from your JUCE build dir)

## TypeScript

Add plugui's types to your plugin's `tsconfig.json`:

```json
{
  "include": ["src", "./plugui/src/types"]
}
```
