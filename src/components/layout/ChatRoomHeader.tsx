import arrowBackIcon from '@/assets/icons/ArrowBack.svg'
import menuBurgerIcon from '@/assets/icons/MenuBurger.svg'
import searchIcon from '@/assets/icons/Search.svg'
import { colors, typography } from '@/styles/tokens'

type ChatRoomHeaderProps = {
  title: string
  memberCount?: number
  onBack: () => void
}

function ChatRoomHeader({ title, memberCount, onBack }: ChatRoomHeaderProps) {
  return (
    <header className="flex w-full items-center px-[20px] py-[16px]">
      <div className="flex flex-1 items-center gap-[4px]">
        <button type="button" onClick={onBack} className="shrink-0">
          <img
            src={arrowBackIcon}
            alt="뒤로가기"
            className="block h-[24px] w-[24px] object-contain"
          />
        </button>
        <span
          className="truncate"
          style={{
            color: colors.grey700,
            fontSize: typography.h3_18_sb.fontSize,
            fontWeight: typography.h3_18_sb.fontWeight,
            lineHeight: typography.h3_18_sb.lineHeight,
            maxWidth: '168px',
          }}
        >
          {title}
        </span>
        {memberCount && (
          <span
            style={{
              color: colors.grey500,
              fontSize: typography.h3_18_sb.fontSize,
              fontWeight: typography.h3_18_sb.fontWeight,
              lineHeight: typography.h3_18_sb.lineHeight,
            }}
          >
            {memberCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-[16px]">
        <img
          src={searchIcon}
          alt="검색"
          className="block h-[24px] w-[24px] object-contain"
        />
        <img
          src={menuBurgerIcon}
          alt="메뉴"
          className="block h-[24px] w-[24px] object-contain"
        />
      </div>
    </header>
  )
}

export default ChatRoomHeader
