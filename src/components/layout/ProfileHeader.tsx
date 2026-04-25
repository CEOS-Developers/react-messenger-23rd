import { useNavigate } from 'react-router-dom'

import arrowBackIcon from '@/assets/icons/ArrowBack.svg'
import settingIcon from '@/assets/icons/Setting.svg'
import { colors, typography } from '@/styles/tokens'

function ProfileHeader() {
  const navigate = useNavigate()

  return (
    <header
      className="flex w-full items-center justify-between"
      style={{ padding: '16px 20px' }}
    >
      <button type="button" onClick={() => navigate(-1)}>
        <img
          src={arrowBackIcon}
          alt="뒤로가기"
          className="block h-[24px] w-[24px] object-contain"
        />
      </button>

      <h1
        className="flex-1 text-center"
        style={{
          color: colors.grey800,
          fontSize: typography.h3_18_sb.fontSize,
          fontWeight: typography.h3_18_sb.fontWeight,
          lineHeight: typography.h3_18_sb.lineHeight,
        }}
      >
        프로필
      </h1>

      <button type="button">
        <img
          src={settingIcon}
          alt="설정"
          className="block h-[24px] w-[24px] object-contain"
        />
      </button>
    </header>
  )
}

export default ProfileHeader
