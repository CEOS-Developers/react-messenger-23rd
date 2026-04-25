import Avatar from '@/components/common/Avatar'
import { colors, typography } from '@/styles/tokens'
import type { ActiveStatus } from '@/types/user'

type MemberItemProps = {
  name: string
  status: ActiveStatus
  isMe?: boolean
}

function MemberItem({ name, status, isMe = false }: MemberItemProps) {
  return (
    <div
      className="flex w-full items-center gap-[12px] rounded-[6px]"
      style={{ padding: '8px' }}
    >
      <Avatar size="xs" showStatus status={status} />
      <span
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        style={{
          color: colors.grey600,
          fontSize: typography.b1_16_m.fontSize,
          fontWeight: typography.b1_16_m.fontWeight,
          lineHeight: typography.b1_16_m.lineHeight,
        }}
      >
        {isMe ? `${name} (나)` : name}
      </span>
    </div>
  )
}

export default MemberItem
