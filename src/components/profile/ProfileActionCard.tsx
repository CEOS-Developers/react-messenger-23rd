import { colors, typography } from '@/styles/tokens'

type ProfileActionCardProps = {
  icon: string
  label: string
  onClick?: () => void
}

function ProfileActionCard({ icon, label, onClick }: ProfileActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-[8px] rounded-[12px] bg-white"
      style={{
        padding: '16px 16px 12px 16px',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)',
      }}
    >
      <img
        src={icon}
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
        {label}
      </span>
    </button>
  )
}

export default ProfileActionCard
