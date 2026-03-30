import { ActionIcon } from '@mantine/core'
import { IconPower } from '@tabler/icons-react'

interface ToggleButtonProps {
  value: boolean
  onChange: (value: boolean) => void
}

export function ToggleButton({ value, onChange }: ToggleButtonProps) {
  return (
    <ActionIcon
      variant={value ? 'filled' : 'subtle'}
      color={value ? 'yellow' : 'gray'}
      size="md"
      onClick={() => onChange(!value)}
      aria-label="Bypass"
    >
      <IconPower size={18} />
    </ActionIcon>
  )
}
