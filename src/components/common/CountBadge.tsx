import { colors, typography } from '@/styles/tokens'

type CountBadgeProps = {
  count: number
}

function CountBadge({ count }: CountBadgeProps) {
  const display = count >= 99 ? '99 +' : String(count)

  return (
    <div
      className="inline-flex shrink-0 items-center justify-center gap-[2px]"
      style={{
        backgroundColor: colors.primary500,
        borderRadius: '12px',
        padding: '2px 7px 1px 8px',
        minWidth: '18px',
      }}
    >
      <span
        style={{
          color: colors.white,
          fontSize: typography.c2_11_sb.fontSize,
          fontWeight: typography.c2_11_sb.fontWeight,
          lineHeight: typography.c2_11_sb.lineHeight,
        }}
      >
        {display}
      </span>
    </div>
  )
}

export default CountBadge
