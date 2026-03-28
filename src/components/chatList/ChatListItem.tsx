import pinIcon from '@/assets/icons/Pin.svg'
import Avatar from '@/components/common/Avatar'
import CountBadge from '@/components/common/CountBadge'
import { colors, typography } from '@/styles/tokens'
import type { ActiveStatus } from '@/types/user'

type ChatListItemProps = {
  name: string
  lastMessage: string
  time: string
  unreadCount?: number
  isPinned?: boolean
  isGroup?: boolean
  memberCount?: number
  status?: ActiveStatus
  onClick?: () => void
}

function ChatListItem({
  name,
  lastMessage,
  time,
  unreadCount = 0,
  isPinned = false,
  isGroup = false,
  memberCount,
  status = 'sleeping',
  onClick,
}: ChatListItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-[12px] self-stretch px-[20px] py-[12px]"
      style={{ borderBottom: `1px solid ${colors.grey200}` }}
    >
      <Avatar size="m" showStatus={!isGroup} status={status} isGroup={isGroup} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-[4px]">
            <span
              className="truncate"
              style={{
                color: colors.grey700,
                fontSize: typography.b1_16_sb.fontSize,
                fontWeight: typography.b1_16_sb.fontWeight,
                lineHeight: typography.b1_16_sb.lineHeight,
              }}
            >
              {name}
            </span>

            {isGroup && memberCount && (
              <span
                style={{
                  color: colors.grey500,
                  fontSize: typography.b2_14_m.fontSize,
                  fontWeight: typography.b2_14_m.fontWeight,
                  lineHeight: typography.b2_14_m.lineHeight,
                }}
              >
                {memberCount}
              </span>
            )}

            {isPinned && (
              <img
                src={pinIcon}
                alt="고정"
                className="h-[20px] w-[20px] shrink-0"
              />
            )}
          </div>

          <span
            className="shrink-0"
            style={{
              color: colors.grey500,
              fontSize: typography.c2_11_r.fontSize,
              fontWeight: typography.c2_11_r.fontWeight,
              lineHeight: typography.c2_11_r.lineHeight,
            }}
          >
            {time}
          </span>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <span
            className="min-w-0 flex-1 truncate"
            style={{
              color: colors.grey500,
              fontSize: typography.b2_14_m.fontSize,
              fontWeight: typography.b2_14_m.fontWeight,
              lineHeight: typography.b2_14_m.lineHeight,
            }}
          >
            {lastMessage || '\u00A0'}
          </span>

          {unreadCount > 0 && <CountBadge count={unreadCount} />}
        </div>
      </div>
    </div>
  )
}

export default ChatListItem
