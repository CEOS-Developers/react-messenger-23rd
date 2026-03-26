type MessageBubbleProps = {
  text?: string;
  time?: string;
  showTime?: boolean;
  unreadCount?: number;
  isMine?: boolean;
  type: "text" | "image";
  imageUrl?: string;
};

export default function MessageBubble({
  text,
  time,
  showTime = false,
  unreadCount,
  isMine = false,
  type,
  imageUrl,
}: MessageBubbleProps) {
  const showMeta = unreadCount !== undefined || showTime;

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

          <div
            className={`rounded-[8px] bg-[#FFE000] ${
              type === "text"
                ? "max-w-[240px] px-[12px] py-[6px]"
                : "max-w-[220px] p-[6px]"
            }`}
          >
            {type === "text" ? (
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
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="보낸 이미지"
                className="h-[140px] w-[180px] rounded-[8px] object-cover"
              />
            ) : (
              <div className="flex h-[140px] w-[180px] items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.5)] text-sm text-[#525254]">
                이미지
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={`rounded-[8px] bg-white ${
              type === "text"
                ? "max-w-[240px] px-[12px] py-[6px]"
                : "max-w-[220px] p-[6px]"
            }`}
          >
            {type === "text" ? (
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
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="받은 이미지"
                className="h-[140px] w-[180px] rounded-[8px] object-cover"
              />
            ) : (
              <div className="flex h-[140px] w-[180px] items-center justify-center rounded-[8px] bg-[rgba(255,255,255,0.5)] text-sm text-[#525254]">
                이미지
              </div>
            )}
          </div>

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