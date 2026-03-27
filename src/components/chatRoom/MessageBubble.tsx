import { colors, typography } from '@/styles/tokens'

type MessageBubbleProps = {
  text: string
  type: 'recipient' | 'me'
}

function MessageBubble({ text, type }: MessageBubbleProps) {
  const isMe = type === 'me'

  return (
    <div
      style={{
        maxWidth: '292px',
        padding: '6px 12px',
        borderRadius: '8px',
        background: isMe ? colors.primaryAlpha10 : colors.white,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span
        style={{
          color: colors.grey700,
          fontSize: typography.b2_14_m.fontSize,
          fontWeight: typography.b2_14_m.fontWeight,
          lineHeight: typography.b2_14_m.lineHeight,
          wordBreak: 'break-word',
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default MessageBubble
