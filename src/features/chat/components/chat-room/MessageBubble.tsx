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
              <div className="max-w-[240px] rounded-[8px] bg-[#FFE000] px-[12px] py-[6px]">
                <p
                  className="text-[14px] font-normal text-[#191919]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    lineHeight: "160%",
                    letterSpacing: "-0.56px",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {text}
                </p>
              </div>
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
              <div className="max-w-[240px] rounded-[8px] bg-white px-[12px] py-[6px]">
                <p
                  className="text-[14px] font-normal text-[#191919]"
                  style={{
                    fontFamily:
                      '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                    fontFeatureSettings: '"liga" off, "clig" off',
                    lineHeight: "160%",
                    letterSpacing: "-0.56px",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {text}
                </p>
              </div>
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