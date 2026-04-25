import { colors, typography } from '@/styles/tokens'

type UpdateCardProps = {
  icon: string
  title: string
  subtitle: string
}

function UpdateCard({ icon, title, subtitle }: UpdateCardProps) {
  return (
    <div
      className="flex flex-1 flex-col items-start gap-[4px] rounded-[12px] bg-white"
      style={{
        padding: '10px 16px 8px 16px',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)',
      }}
    >
      <img
        src={icon}
        alt=""
        className="block h-[24px] w-[24px] object-contain"
      />
      <div className="flex flex-col">
        <span
          style={{
            color: colors.grey700,
            fontSize: typography.b2_14_m.fontSize,
            fontWeight: typography.b2_14_m.fontWeight,
            lineHeight: typography.b2_14_m.lineHeight,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: colors.grey500,
            fontSize: typography.b2_14_sb.fontSize,
            fontWeight: typography.b2_14_sb.fontWeight,
            lineHeight: typography.b2_14_sb.lineHeight,
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  )
}

export default UpdateCard
