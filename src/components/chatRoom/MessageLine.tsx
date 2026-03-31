import Avatar from '@/components/common/Avatar'
import MessageBubble from '@/components/chatRoom/MessageBubble'
import { colors, typography } from '@/styles/tokens'

type MessageLineProps =
  | {
      type: 'recipient'
      senderName: string
      messages: string[]
      isFirstLine: boolean
      showTime: boolean
      time?: string
      status?: 'active' | 'away' | 'sleeping'
    }
  | {
      type: 'me'
      messages: string[]
      isFirstLine: boolean
      showTime: boolean
      time?: string
    }

function MessageLine(props: MessageLineProps) {
  if (props.type === 'me') {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '0 20px',
        }}
      >
        {props.messages.map((msg, i) => (
          <MessageBubble key={i} text={msg} type="me" />
        ))}
        {props.showTime && props.time && (
          <span
            style={{
              color: colors.grey500,
              fontSize: typography.c2_11_r.fontSize,
              fontWeight: typography.c2_11_r.fontWeight,
              lineHeight: typography.c2_11_r.lineHeight,
            }}
          >
            {props.time}
          </span>
        )}
      </div>
    )
  }

  // type === 'recipient' — firstLine과 non-firstLine 동일 구조
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        padding: props.isFirstLine ? '8px 20px 0' : '0 20px',
        alignItems: 'flex-start',
        gap: '8px',
        alignSelf: 'stretch',
      }}
    >
      <div style={{ width: '32px', flexShrink: 0 }}>
        {props.isFirstLine && <Avatar size="s" showStatus status={props.status} />}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          minWidth: 0,
        }}
      >
        {props.isFirstLine && (
          <span
            style={{
              color: colors.grey700,
              fontSize: typography.b2_14_b.fontSize,
              fontWeight: typography.b2_14_b.fontWeight,
              lineHeight: typography.b2_14_b.lineHeight,
            }}
          >
            {props.senderName}
          </span>
        )}
        {props.messages.map((msg, i) => (
          <MessageBubble key={i} text={msg} type="recipient" />
        ))}
        {props.showTime && props.time && (
          <span
            style={{
              color: colors.grey500,
              fontSize: typography.c2_11_r.fontSize,
              fontWeight: typography.c2_11_r.fontWeight,
              lineHeight: typography.c2_11_r.lineHeight,
            }}
          >
            {props.time}
          </span>
        )}
      </div>
    </div>
  )
}

export default MessageLine
