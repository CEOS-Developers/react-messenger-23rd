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

  return (
    <div className="flex items-end gap-[8px]">
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
          ) : (
            <ImageMessageGrid imageUrls={resolvedImageUrls} />
          )}
        </>
      ) : (
        <>
          {type === "text" ? (
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
          ) : (
            <ImageMessageGrid imageUrls={resolvedImageUrls} />
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