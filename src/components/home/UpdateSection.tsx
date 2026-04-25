import bookmarkIcon from '@/assets/icons/Bookmark.svg'
import draftIcon from '@/assets/icons/Draft.svg'
import headPhoneIcon from '@/assets/icons/HeadPhone.svg'
import { colors, typography } from '@/styles/tokens'

import UpdateCard from './UpdateCard'

function UpdateSection() {
  return (
    <section
      className="flex flex-col items-start gap-[12px]"
      style={{ padding: '12px 20px 20px 20px' }}
    >
      <h2
        style={{
          color: colors.grey800,
          fontSize: typography.b2_14_b.fontSize,
          fontWeight: typography.b2_14_b.fontWeight,
          lineHeight: typography.b2_14_b.lineHeight,
        }}
      >
        새로운 업데이트
      </h2>

      <div className="flex items-center gap-[12px] self-stretch">
        <UpdateCard icon={headPhoneIcon} title="보이스 채팅" subtitle="0개 라이브" />
        <UpdateCard icon={bookmarkIcon} title="저장됨" subtitle="0개 항목" />
        <UpdateCard icon={draftIcon} title="작성중 / 초안" subtitle="0개 항목" />
      </div>
    </section>
  )
}

export default UpdateSection
