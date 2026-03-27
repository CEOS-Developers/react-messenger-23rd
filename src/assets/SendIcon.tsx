interface Props {
  className?: string
}

function SendIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M13.0391 4.50879L20.0811 11.5498L20.1201 11.5898L18.7285 12.9814L18.6895 12.9414L13.9893 8.24121V22.8682H12.0098V8.24121L7.30957 12.9414L7.27051 12.9814L7.23047 12.9414L5.91895 11.6289L5.87891 11.5898L13 4.46875L13.0391 4.50879Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.11"
      />
    </svg>
  )
}

export default SendIcon
