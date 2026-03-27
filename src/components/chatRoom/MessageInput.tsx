import { useRef, useState } from 'react'

import emojiIcon from '@/assets/icons/Emoji.svg'
import mentionIcon from '@/assets/icons/Mention.svg'
import micIcon from '@/assets/icons/Mic.svg'
import plusIcon from '@/assets/icons/Plus.svg'
import sendFillIcon from '@/assets/icons/Send/Fill.svg'
import textStyleIcon from '@/assets/icons/TextStyle.svg'
import { colors, typography } from '@/styles/tokens'

type MessageInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
}

function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const hasText = value.trim().length > 0
  const isExpanded = isFocused || hasText

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 172)}px`
  }

  return (
    <div className="flex w-full flex-col px-[20px] py-[10px]">
      {isExpanded ? (
        <div
          style={{
            borderRadius: '16px',
            border: `1px solid ${colors.grey300}`,
            padding: '16px 12px',
            maxHeight: '172px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!hasText) setIsFocused(false)
            }}
            placeholder="메세지를 입력해 주세요"
            rows={1}
            className="w-full resize-none border-none bg-transparent outline-none"
            style={{
              color: colors.grey700,
              fontSize: typography.b2_14_m.fontSize,
              fontWeight: typography.b2_14_m.fontWeight,
              lineHeight: typography.b2_14_m.lineHeight,
              overflowY: 'auto',
              minHeight: '21px',
              flex: '1 1 auto',
            }}
          />
          <div className="mt-[20px] flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <img
                src={plusIcon}
                alt="추가"
                className="block h-[24px] w-[24px]"
                style={{ opacity: 0.55 }}
              />
              <img
                src={textStyleIcon}
                alt="텍스트 스타일"
                className="block h-[24px] w-[24px]"
                style={{ opacity: 0.55 }}
              />
              <img
                src={emojiIcon}
                alt="이모지"
                className="block h-[24px] w-[24px]"
                style={{ opacity: 0.55 }}
              />
              <img
                src={mentionIcon}
                alt="멘션"
                className="block h-[24px] w-[24px]"
                style={{ opacity: 0.55 }}
              />
            </div>
            <button type="button" onClick={onSend}>
              <img
                src={sendFillIcon}
                alt="전송"
                className="block h-[24px] w-[24px]"
                style={
                  hasText
                    ? {}
                    : { filter: 'brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) brightness(56%)' }
                }
              />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-[20px]"
          style={{
            padding: '8px 12px',
            borderRadius: '99px',
            border: `1px solid ${colors.grey300}`,
          }}
        >
          <img src={plusIcon} alt="추가" className="block h-[24px] w-[24px] shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="메세지를 입력해 주세요"
            className="min-w-0 flex-1 border-none bg-transparent outline-none"
            style={{
              color: colors.grey700,
              fontSize: typography.b2_14_m.fontSize,
              fontWeight: typography.b2_14_m.fontWeight,
              lineHeight: typography.b2_14_m.lineHeight,
            }}
          />
          <img src={micIcon} alt="음성" className="block h-[24px] w-[24px] shrink-0" />
        </div>
      )}
    </div>
  )
}

export default MessageInput
