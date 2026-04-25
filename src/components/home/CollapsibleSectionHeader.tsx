import chevronDownIcon from '@/assets/icons/ChevronDown.svg'
import plusIcon from '@/assets/icons/Plus.svg'
import { colors, typography } from '@/styles/tokens'

type CollapsibleSectionHeaderProps = {
  icon: string
  title: string
}

function CollapsibleSectionHeader({ icon, title }: CollapsibleSectionHeaderProps) {
  return (
    <div
      className="flex w-full items-center justify-between"
      style={{
        padding: '20px',
        borderBottom: `0.6px solid ${colors.grey300}`,
      }}
    >
      <div className="flex items-center gap-[12px]">
        <img
          src={icon}
          alt=""
          className="block h-[24px] w-[24px] object-contain"
        />
        <span
          style={{
            color: colors.grey700,
            fontSize: typography.b2_14_b.fontSize,
            fontWeight: typography.b2_14_b.fontWeight,
            lineHeight: typography.b2_14_b.lineHeight,
          }}
        >
          {title}
        </span>
      </div>

      <div className="flex items-center justify-end gap-[8px]">
        <button type="button">
          <img
            src={plusIcon}
            alt="추가"
            className="block h-[24px] w-[24px] object-contain"
          />
        </button>
        <button type="button">
          <img
            src={chevronDownIcon}
            alt="펼치기"
            className="block h-[24px] w-[24px] object-contain"
          />
        </button>
      </div>
    </div>
  )
}

export default CollapsibleSectionHeader
