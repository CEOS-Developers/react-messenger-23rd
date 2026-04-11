import { useEffect, useRef, useState } from "react";
import ImageMessageGrid from "./ImageMessageGrid";

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

  const bubbleBg = isMine ? "#FFE000" : "#FFFFFF";

  const textStyle = {
    fontFamily:
      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
    fontFeatureSettings: '"liga" off, "clig" off',
    lineHeight: "160%",
    letterSpacing: "-0.56px",
    wordBreak: "break-word" as const,
    whiteSpace: "normal" as const,
  };

  if (!isMaxVariant) {
    return (
      <div
        className={`max-w-[240px] rounded-[8px] px-[12px] pt-[7px] pb-[5px] md:py-[6px] ${isMine ? "bg-[#FFE000]" : "bg-white"
          }`}
      >
        <p
          ref={measureRef}
          className="text-[14px] font-normal text-[#191919]"
          style={textStyle}
        >
          {text}
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex w-[240px] max-w-[240px] flex-col items-end gap-[6px] rounded-[8px] pt-[6px] pr-[12px] pb-[8px] pl-[12px]"
      style={{ background: bubbleBg }}
    >
      <p
        ref={measureRef}
        className={`w-full overflow-hidden text-[14px] font-normal text-[#191919] ${isExpanded ? "" : "line-clamp-[11]"
          }`}
        style={textStyle}
      >
        {text}
      </p>

      <div
        className="w-full"
        style={{
          height: 0,
          alignSelf: "stretch",
          borderTop: "0.75px solid rgba(25, 25, 25, 0.10)",
        }}
      />

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="overflow-hidden text-right text-[10px] font-normal text-[#525254] transition-colors hover:font-medium hover:text-[#363638]"
        style={{
          fontFamily:
            '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          fontFeatureSettings: '"liga" off, "clig" off',
          lineHeight: "140%",
          letterSpacing: "-0.4px",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          textOverflow: "ellipsis",
        }}
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
                  className="text-right text-[10px] font-normal text-[#79797B]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    lineHeight: "140%",
                    letterSpacing: "-0.4px",
                  }}
                >
                  {time}
                </span>
              ) : null}

              {unreadCount !== undefined ? (
                <span
                  className="text-[10px] font-normal text-[#FFEEB8]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    lineHeight: "140%",
                    letterSpacing: "-0.4px",
                  }}
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
                  className="text-[10px] font-normal text-[#FFEEB8]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    lineHeight: "140%",
                    letterSpacing: "-0.4px",
                  }}
                >
                  {unreadCount}
                </span>
              ) : null}

              {showTime && time ? (
                <span
                  className="text-right text-[10px] font-normal text-[#79797B]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    lineHeight: "140%",
                    letterSpacing: "-0.4px",
                  }}
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
