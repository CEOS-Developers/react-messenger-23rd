import { useEffect, useRef, useState } from "react";
import ImageMessageGrid from "@/features/chat/components/chat-room/ImageMessageGrid";
import { isHangulCompatibilityJamo } from "@/features/chat/utils/hangulJamo";

type MessageBubbleProps = {
  text?: string;
  time?: string;
  showTime?: boolean;
  unreadCount?: number;
  isMine?: boolean;
  type: "text" | "image";
  imageUrl?: string;
  imageUrls?: string[];
};

function extractEmojiUnits(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const units = Array.from(trimmed);
  if (units.length === 0) return [];

  const isEmojiOnly = units.every((char) =>
    /\p{Extended_Pictographic}/u.test(char)
  );

  return isEmojiOnly ? units : [];
}

function renderTextWithJamoFix(text: string) {
  return Array.from(text).map((char, index) =>
    isHangulCompatibilityJamo(char) ? (
      <span key={`${char}-${index}`} className="hangul-jamo-fix">
        {char}
      </span>
    ) : (
      char
    )
  );
}

function EmojiOnlyBubble({ emojis }: { emojis: string[] }) {
  if (emojis.length === 1) {
    return (
      <div className="box-border flex h-[160px] w-[160px] shrink-0 items-center justify-center p-[4px]">
        <span className="text-[88px] leading-none">{emojis[0]}</span>
      </div>
    );
  }

  if (emojis.length === 2) {
    return (
      <div className="box-border flex w-[200px] items-center justify-center gap-[8px] p-[10px]">
        {emojis.map((emoji, index) => (
          <div
            key={`emoji-${index}`}
            className="flex min-w-0 flex-1 items-center justify-center"
          >
            <span className="text-[68px] leading-none">{emoji}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="box-border flex w-[224px] items-center justify-center gap-[8px] p-[10px]">
      {emojis.map((emoji, index) => (
        <div
          key={`emoji-${index}`}
          className="flex min-w-0 flex-1 items-center justify-center"
        >
          <span className="text-[56px] leading-none">{emoji}</span>
        </div>
      ))}
    </div>
  );
}

function TextBubbleContent({
  text,
  isMine,
}: {
  text: string;
  isMine: boolean;
}) {
  const measureRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMaxVariant, setIsMaxVariant] = useState(false);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    const checkOverflow = () => {
      setIsMaxVariant(element.scrollHeight > 264);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  const bubbleBgClass = isMine ? "bg-chat-yellow-200" : "bg-chat-white";

  if (!isMaxVariant) {
    return (
      <div
        className={`max-w-[240px] rounded-[8px] px-[12px] pt-[7px] pb-[5px] md:py-[6px] ${bubbleBgClass}`}
      >
        <p
          ref={measureRef}
          className="typo-sub-body chat-text text-chat-black"
        >
          {renderTextWithJamoFix(text)}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex w-[240px] max-w-[240px] flex-col items-end gap-[6px] rounded-[8px] pt-[6px] pr-[12px] pb-[8px] pl-[12px] ${bubbleBgClass}`}
    >
      <p
        ref={measureRef}
        className={`typo-sub-body chat-text w-full overflow-hidden text-chat-black ${isExpanded ? "" : "line-clamp-[11]"
          }`}
      >
        {renderTextWithJamoFix(text)}
      </p>

      <div className="h-0 w-full self-stretch border-t-[0.75px] border-chat-black/10" />

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="typo-caption-03 line-clamp-1 overflow-hidden text-right text-chat-gray-500 transition-colors hover:font-medium hover:text-chat-gray-600"
      >
        {isExpanded ? "접기" : "전체보기"}
      </button>
    </div>
  );
}

export default function MessageBubble({
  text,
  time,
  showTime = false,
  unreadCount,
  isMine = false,
  type,
  imageUrl,
  imageUrls,
}: MessageBubbleProps) {
  const showMeta = unreadCount !== undefined || showTime;

  const resolvedImageUrls =
    imageUrls && imageUrls.length > 0
      ? imageUrls
      : imageUrl
        ? [imageUrl]
        : [];

  const emojiUnits = type === "text" && text ? extractEmojiUnits(text) : [];
  const isEmojiOnlyMessage = emojiUnits.length >= 1 && emojiUnits.length <= 3;

  return (
    <div className="flex w-fit items-end gap-[8px]">
      {isMine ? (
        <>
          {showMeta ? (
            <div className="flex items-center gap-[4px]">
              {showTime && time ? (
                <span
                  className="typo-caption-03 text-right text-chat-gray-400"
                >
                  {time}
                </span>
              ) : null}

              {unreadCount !== undefined ? (
                <span
                  className="typo-caption-03 text-chat-yellow-100"
                >
                  {unreadCount}
                </span>
              ) : null}
            </div>
          ) : null}

          {type === "text" ? (
            isEmojiOnlyMessage ? (
              <div className="w-fit">
                <EmojiOnlyBubble emojis={emojiUnits} />
              </div>
            ) : (
              <TextBubbleContent text={text ?? ""} isMine={isMine} />
            )
          ) : (
            <div className="w-fit">
              <ImageMessageGrid imageUrls={resolvedImageUrls} />
            </div>
          )}
        </>
      ) : (
        <>
          {type === "text" ? (
            isEmojiOnlyMessage ? (
              <div className="w-fit">
                <EmojiOnlyBubble emojis={emojiUnits} />
              </div>
            ) : (
              <TextBubbleContent text={text ?? ""} isMine={isMine} />
            )
          ) : (
            <div className="w-fit">
              <ImageMessageGrid imageUrls={resolvedImageUrls} />
            </div>
          )}

          {showMeta ? (
            <div className="flex items-center gap-[4px]">
              {unreadCount !== undefined ? (
                <span
                  className="typo-caption-03 text-chat-yellow-100"
                >
                  {unreadCount}
                </span>
              ) : null}

              {showTime && time ? (
                <span
                  className="typo-caption-03 text-right text-chat-gray-400"
                >
                  {time}
                </span>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
