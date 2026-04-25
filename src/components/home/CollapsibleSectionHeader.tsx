import chevronDownIcon from '@/assets/icons/ChevronDown.svg'
import plusIcon from '@/assets/icons/PlusLight.svg'
import { colors, typography } from '@/styles/tokens'

type CollapsibleSectionHeaderProps = {
  icon: string
  title: string
  isExpanded?: boolean
  onToggle?: () => void
}

function CollapsibleSectionHeader({
  icon,
  title,
  isExpanded = false,
  onToggle,
}: CollapsibleSectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
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
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '접기' : '펼치기'}
        >
          <img
            src={chevronDownIcon}
            alt=""
            className="block h-[24px] w-[24px] object-contain transition-transform"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      </div>
    </div>
  )
}

export default CollapsibleSectionHeader
