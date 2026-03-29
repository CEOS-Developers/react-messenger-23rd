import addChatIcon from '@/assets/icons/AddChat.svg'
import searchIcon from '@/assets/icons/Search.svg'
import { colors, typography } from '@/styles/tokens'

function ChatListHeader() {
  return (
    <header className="flex h-[68px] w-full items-center justify-between px-[20px] py-[16px]">
      <h1
        style={{
          color: colors.grey800,
          fontSize: typography.h2_22_b.fontSize,
          fontWeight: typography.h2_22_b.fontWeight,
          lineHeight: typography.h2_22_b.lineHeight,
        }}
      >
        DM
      </h1>

      <div className="flex items-center gap-[16px]">
        <img
          src={searchIcon}
          alt="검색"
          className="block h-[24px] w-[24px] object-contain"
        />
        <img
          src={addChatIcon}
          alt="채팅 추가"
          className="block h-[24px] w-[24px] object-contain"
        />
      </div>
    </header>
  )
}

export default ChatListHeader