import { useNavigate } from 'react-router-dom'

import searchIcon from '@/assets/icons/Search.svg'
import Avatar from '@/components/common/Avatar'
import { colors, typography } from '@/styles/tokens'

function HomeHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex w-full items-center justify-between px-[20px] py-[16px]">
      <div className="flex min-w-0 max-w-[256px] flex-1 items-center gap-[10px]">
        <div
          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
          style={{ background: '#1A1F3D' }}
          aria-label="CEOS"
        >
          <span
            style={{
              color: colors.white,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2px',
            }}
          >
            CEOS
          </span>
        </div>

        <h1
          className="truncate"
          style={{
            color: colors.grey800,
            fontSize: typography.h3_18_b.fontSize,
            fontWeight: typography.h3_18_b.fontWeight,
            lineHeight: typography.h3_18_b.lineHeight,
          }}
        >
          CEOS 디자인 파트
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-[16px]">
        <button type="button">
          <img
            src={searchIcon}
            alt="검색"
            className="block h-[24px] w-[24px] object-contain"
          />
        </button>
        <button
          type="button"
          aria-label="내 프로필"
          onClick={() => navigate('/profile')}
        >
          <Avatar size="xs" showStatus status="active" />
        </button>
      </div>
    </header>
  )
}

export default HomeHeader
