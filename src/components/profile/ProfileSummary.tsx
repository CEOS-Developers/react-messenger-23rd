import Avatar from '@/components/common/Avatar'
import { colors, typography } from '@/styles/tokens'

type ProfileSummaryProps = {
  name: string
  jobTitle?: string
}

function ProfileSummary({ name, jobTitle }: ProfileSummaryProps) {
  return (
    <div
      className="flex items-start self-stretch"
      style={{ gap: '16px' }}
    >
      <Avatar size="l" />
      <div className="flex flex-col self-stretch">
        <h2
          className="self-stretch"
          style={{
            color: colors.grey700,
            fontSize: typography.h2_22_b.fontSize,
            fontWeight: typography.h2_22_b.fontWeight,
            lineHeight: typography.h2_22_b.lineHeight,
          }}
        >
          {name}
        </h2>
        {jobTitle && (
          <p
            style={{
              color: colors.grey600,
              fontSize: typography.b2_14_m.fontSize,
              fontWeight: typography.b2_14_m.fontWeight,
              lineHeight: typography.b2_14_m.lineHeight,
            }}
          >
            {jobTitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileSummary
