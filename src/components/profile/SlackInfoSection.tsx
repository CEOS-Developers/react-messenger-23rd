import informationCircleIcon from '@/assets/icons/InformationCircle.svg'
import linkExternalIcon from '@/assets/icons/LinkExternal.svg'
import newsIcon from '@/assets/icons/News.svg'
import { colors, typography } from '@/styles/tokens'

import IconTextRow from './IconTextRow'

function SlackInfoSection() {
  return (
    <section
      className="flex flex-col items-start self-stretch"
      style={{
        padding: '20px',
        gap: '16px',
        borderTop: `0.6px solid ${colors.grey300}`,
      }}
    >
      <h2
        style={{
          color: colors.grey700,
          fontSize: typography.b1_16_sb.fontSize,
          fontWeight: typography.b1_16_sb.fontWeight,
          lineHeight: typography.b1_16_sb.lineHeight,
        }}
      >
        Slack 정보
      </h2>

      <div
        className="flex flex-col items-start self-stretch"
        style={{ gap: '16px' }}
      >
        <IconTextRow
          icon={informationCircleIcon}
          text="버전"
          description="26.03.30 (456065)"
        />
        <IconTextRow
          icon={newsIcon}
          text="사용하는 라이브러리"
          description="오픈소스 라이선스"
          trailingIcon={linkExternalIcon}
        />
      </div>
    </section>
  )
}

export default SlackInfoSection
