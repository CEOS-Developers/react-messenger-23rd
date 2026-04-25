import callIcon from '@/assets/icons/Call.svg'
import emailIcon from '@/assets/icons/Email.svg'
import { colors, typography } from '@/styles/tokens'

import IconTextRow from './IconTextRow'

type ContactSectionProps = {
  email: string
  phone: string
}

function ContactSection({ email, phone }: ContactSectionProps) {
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
        연락처
      </h2>

      <div
        className="flex flex-col items-start self-stretch"
        style={{ gap: '16px' }}
      >
        <IconTextRow icon={emailIcon} text={email} />
        <IconTextRow icon={callIcon} text={phone} />
      </div>
    </section>
  )
}

export default ContactSection
