import arrowRightIcon from '@/assets/icons/ArrowRight.svg'
import historyIcon from '@/assets/icons/History.svg'
import { colors, typography } from '@/styles/tokens'
import type { ActiveStatus } from '@/types/user'

const STATUS_LABEL: Record<ActiveStatus, string> = {
  active: '활동중',
  away: '자리비움',
  sleeping: '오프라인',
}

const STATUS_COLOR: Record<ActiveStatus, string> = {
  active: colors.secondary200,
  away: '#E2A53A',
  sleeping: colors.grey400,
}

type StatusRowProps = {
  status: ActiveStatus
}

function StatusRow({ status }: StatusRowProps) {
  return (
    <div
      className="flex w-full items-center justify-between rounded-[12px] bg-white"
      style={{
        padding: '12px 16px',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className="flex items-center gap-[8px]">
        <img
          src={historyIcon}
          alt=""
          className="block h-[24px] w-[24px] object-contain"
        />
        <span
          style={{
            color: colors.grey700,
            fontSize: typography.b2_14_m.fontSize,
            fontWeight: typography.b2_14_m.fontWeight,
            lineHeight: typography.b2_14_m.lineHeight,
          }}
        >
          상태
        </span>
      </div>

      <div className="flex items-center gap-[4px]">
        <span
          className="block h-[8px] w-[8px] rounded-full"
          style={{ background: STATUS_COLOR[status] }}
        />
        <span
          className="text-center"
          style={{
            color: colors.grey700,
            fontSize: typography.b2_14_m.fontSize,
            fontWeight: typography.b2_14_m.fontWeight,
            lineHeight: typography.b2_14_m.lineHeight,
          }}
        >
          {STATUS_LABEL[status]}
        </span>
        <img
          src={arrowRightIcon}
          alt=""
          className="block h-[24px] w-[24px] object-contain"
        />
      </div>
    </div>
  )
}

export default StatusRow
