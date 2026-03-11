interface CheckIconProps {
  size?: number
  color?: string
}

export default function CheckIcon({ size = 16, color = 'currentColor' }: CheckIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 8l3 3L12 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
