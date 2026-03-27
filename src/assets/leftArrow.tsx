interface Props {
  className?: string
}

export default function BackIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      <path
        d="M22.5 9L13 18.5L22.5 28"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}
