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
          display: 'flex',
          maxWidth: '264px',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '8px 18px 0 26px',
          marginLeft: 'auto',
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

  // type === 'recipient'
  if (props.isFirstLine) {
    return (
      <div
        className="flex gap-[8px]"
        style={{ padding: '8px 20px 0 22px' }}
      >
        <Avatar size="s" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            flex: 1,
          }}
        >
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

  // recipient, not first line
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '8px 20px 0 62px',
      }}
    >
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
  )
}

export default MessageLine
