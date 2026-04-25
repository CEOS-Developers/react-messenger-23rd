import { colors, typography } from '@/styles/tokens'

type IconTextRowProps = {
  icon: string
  text: string
  description?: string
  trailingIcon?: string
}

function IconTextRow({ icon, text, description, trailingIcon }: IconTextRowProps) {
  return (
    <div
      className="flex items-center self-stretch"
      style={{ gap: '12px' }}
    >
      <img
        src={icon}
        alt=""
        className="block h-[24px] w-[24px] shrink-0 object-contain"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          style={{
            color: colors.grey700,
            fontSize: typography.b2_14_sb.fontSize,
            fontWeight: typography.b2_14_sb.fontWeight,
            lineHeight: typography.b2_14_sb.lineHeight,
          }}
        >
          {text}
        </span>
        {description && (
          <span
            style={{
              color: colors.grey700,
              fontSize: typography.c2_11_r.fontSize,
              fontWeight: typography.c2_11_r.fontWeight,
              lineHeight: typography.c2_11_r.lineHeight,
            }}
          >
            {description}
          </span>
        )}
      </div>
      {trailingIcon && (
        <img
          src={trailingIcon}
          alt=""
          className="block h-[24px] w-[24px] shrink-0 object-contain"
        />
      )}
    </div>
  )
}

export default IconTextRow
