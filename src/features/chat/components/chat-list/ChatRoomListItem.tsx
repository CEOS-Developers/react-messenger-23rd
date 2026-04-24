import { useRef, useState, type PointerEvent } from "react";
import CountBadge from "@/features/chat/components/chat-list/CountBadge";
import ProfileImageSvg from "@/assets/icons/ProfileImage.svg";
import ProfileImageOnePng from "@/assets/images/ProfileImage_1.png";
import ProfileImageTwoPng from "@/assets/images/ProfileImage_2.png";
import ImageOneJpg from "@/assets/images/image_1.jpg";
import ImageTwoJpg from "@/assets/images/image_2.jpg";
import TackIconSvg from "@/assets/icons/ic_Tack.svg";
import BellOffIconSvg from "@/assets/icons/ic_BellOff.svg";
import type { MessageType } from "@/features/chat/types/chat";

type ChatRoomListItemProps = {
  name: string;
  participantCount?: number;
  profileImageNames?: string[];
  lastMessageType?: MessageType;
  imageCount?: number;
  previewImageUrl?: string;
  lastMessage: string;
  sentAtLabel: string;
  unreadLabel?: string;
  showPinnedIcon?: boolean;
  showMutedIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type ProfileTileProps = {
  className: string;
  imageSrc: string;
  roundedClassName?: string;
};

const ACTION_AREA_WIDTH = 160;
const SWIPE_DIRECTION_THRESHOLD = 24;

const profileImageMap: Record<string, string> = {
  "ProfileImage.svg": ProfileImageSvg,
  "ProfileImage_1.png": ProfileImageOnePng,
  "ProfileImage_2.png": ProfileImageTwoPng,
};

const previewImageMap: Record<string, string> = {
  image_1: ImageOneJpg,
  "image_1.jpg": ImageOneJpg,
  image_2: ImageTwoJpg,
  "image_2.jpg": ImageTwoJpg,
};

function resolveProfileImage(profileImage?: string) {
  if (!profileImage) return ProfileImageSvg;

  return profileImageMap[profileImage] ?? ProfileImageSvg;
}

function resolvePreviewImage(imageUrl?: string) {
  if (!imageUrl) return ImageOneJpg;

  return previewImageMap[imageUrl] ?? imageUrl;
}

function ProfileTile({
  className,
  imageSrc,
  roundedClassName = "rounded-[10px]",
}: ProfileTileProps) {
  return (
    <span
      className={`flex items-center justify-center overflow-hidden border border-chat-white bg-chat-gray-100 ${roundedClassName} ${className}`}
    >
      <img src={imageSrc} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

function GroupProfileImage({ profileImages }: { profileImages: string[] }) {
  const count = profileImages.length;
  const resolvedProfileImages = profileImages.map(resolveProfileImage);

  if (count === 2) {
    return (
      <span className="relative h-[48px] w-[48px] shrink-0">
        <ProfileTile
          className="absolute top-[10px] left-[1px] h-[28px] w-[28px]"
          imageSrc={resolvedProfileImages[0]}
        />
        <ProfileTile
          className="absolute top-[10px] left-[19px] h-[28px] w-[28px]"
          imageSrc={resolvedProfileImages[1]}
        />
      </span>
    );
  }

  if (count === 3) {
    return (
      <span className="relative h-[48px] w-[48px] shrink-0">
        <ProfileTile
          className="absolute top-0 left-0 h-[28px] w-[28px]"
          imageSrc={resolvedProfileImages[0]}
        />
        <ProfileTile
          className="absolute top-0 left-[20px] h-[28px] w-[28px]"
          imageSrc={resolvedProfileImages[1]}
        />
        <ProfileTile
          className="absolute top-[20px] left-[10px] h-[28px] w-[28px]"
          imageSrc={resolvedProfileImages[2]}
        />
      </span>
    );
  }

  return (
    <span className="grid h-[48px] w-[48px] shrink-0 grid-cols-2 place-items-center">
      {resolvedProfileImages.slice(0, 4).map((imageSrc, index) => (
        <ProfileTile
          key={`${imageSrc}-${index}`}
          className="h-[24px] w-[24px]"
          imageSrc={imageSrc}
          roundedClassName="rounded-[8px]"
        />
      ))}
    </span>
  );
}

function ChatRoomProfileImage({
  profileImages = ["ProfileImage.svg"],
}: {
  profileImages?: string[];
}) {
  if (profileImages.length > 1) {
    return <GroupProfileImage profileImages={profileImages} />;
  }

  return (
    <img
      src={resolveProfileImage(profileImages[0])}
      alt=""
      className="h-[48px] w-[48px] shrink-0 rounded-[16px]"
    />
  );
}

function ImageMessagePreview({
  imageCount = 1,
  previewImageUrl,
}: {
  imageCount?: number;
  previewImageUrl?: string;
}) {
  const imageCountLabel = String(imageCount);

  return (
    <span className="flex max-w-[216px] min-w-0 flex-[1_0_0] items-center gap-[8px]">
      <img
        src={resolvePreviewImage(previewImageUrl)}
        alt=""
        className="h-[32px] w-[32px] shrink-0 object-cover"
      />

      <span className="flex min-w-0 items-center gap-0">
        <span className="line-clamp-1 overflow-hidden text-ellipsis font-kakao-small text-[12px] leading-[160%] font-normal tracking-[0] text-chat-gray-400">
          {imageCountLabel}
        </span>
        <span className="line-clamp-1 overflow-hidden text-ellipsis font-kakao-small text-[12px] leading-[160%] font-normal tracking-[0] text-chat-gray-400">
          장의 사진을 보냈습니다.
        </span>
      </span>
    </span>
  );
}

function MessagePreview({
  lastMessageType = "text",
  imageCount,
  previewImageUrl,
  lastMessage,
}: {
  lastMessageType?: MessageType;
  imageCount?: number;
  previewImageUrl?: string;
  lastMessage: string;
}) {
  if (lastMessageType === "image") {
    return (
      <ImageMessagePreview
        imageCount={imageCount}
        previewImageUrl={previewImageUrl}
      />
    );
  }

  return (
    <span className="line-clamp-2 max-h-[38px] max-w-[216px] min-w-0 flex-[1_0_0] overflow-hidden font-kakao-small text-[12px] leading-[160%] font-normal tracking-[0] text-chat-gray-400">
      {lastMessage}
    </span>
  );
}

export default function ChatRoomListItem({
  name,
  participantCount,
  profileImageNames,
  lastMessageType,
  imageCount,
  previewImageUrl,
  lastMessage,
  sentAtLabel,
  unreadLabel,
  showPinnedIcon = false,
  showMutedIcon = false,
  disabled = false,
  onClick,
}: ChatRoomListItemProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startTranslateXRef = useRef(0);
  const currentTranslateXRef = useRef(0);
  const suppressClickRef = useRef(false);

  const hasTitleMeta =
    participantCount !== undefined || showPinnedIcon || showMutedIcon;
  const isActionVisible = isDragging || translateX < 0;

  const updateTranslateX = (nextTranslateX: number) => {
    currentTranslateXRef.current = nextTranslateX;
    setTranslateX(nextTranslateX);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    startXRef.current = event.clientX;
    startTranslateXRef.current = currentTranslateXRef.current;
    suppressClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startXRef.current;
    const nextTranslateX = Math.min(
      0,
      Math.max(-ACTION_AREA_WIDTH, startTranslateXRef.current + deltaX)
    );

    if (Math.abs(deltaX) > 6) {
      suppressClickRef.current = true;
    }

    updateTranslateX(nextTranslateX);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const dragDistance = event.clientX - startXRef.current;
    const shouldOpen =
      Math.abs(dragDistance) > SWIPE_DIRECTION_THRESHOLD
        ? dragDistance < 0
        : currentTranslateXRef.current <= -ACTION_AREA_WIDTH / 2;

    updateTranslateX(shouldOpen ? -ACTION_AREA_WIDTH : 0);
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    if (currentTranslateXRef.current !== 0) {
      updateTranslateX(0);
      return;
    }

    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <div className="relative h-[80px] w-full overflow-hidden bg-chat-white">
      <div
        className={`absolute top-0 right-0 flex h-[80px] ${
          isActionVisible ? "" : "hidden"
        }`}
      >
        <button
          type="button"
          className="flex h-[80px] w-[80px] items-center justify-center gap-[10px] bg-chat-gray-400 p-[10px]"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="text-center font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] text-chat-white">
            보관
          </span>
        </button>

        <button
          type="button"
          className="flex h-[80px] w-[80px] items-center justify-center gap-[10px] bg-chat-accent-100 p-[10px]"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="text-center font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] text-chat-white">
            나가기
          </span>
        </button>
      </div>

      <button
        type="button"
        aria-disabled={disabled}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={`relative z-10 flex h-[80px] w-full touch-pan-y items-center justify-end gap-[16px] bg-chat-white px-[16px] py-[8px] text-left ${
          disabled ? "cursor-default" : ""
        } ${isDragging ? "" : "transition-transform duration-200 ease-out"}`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <ChatRoomProfileImage profileImages={profileImageNames} />

        <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
          <span className="flex items-center justify-between self-stretch">
            <span className="flex w-[200px] max-w-[216px] min-w-0 items-center justify-start gap-[4px]">
              <span className="max-h-[22px] max-w-[162px] shrink truncate font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] text-chat-black">
                {name}
              </span>

              {hasTitleMeta ? (
                <span className="flex shrink-0 items-center gap-[2px]">
                  {participantCount !== undefined ? (
                    <span className="font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] text-chat-gray-400">
                      {participantCount}
                    </span>
                  ) : null}

                  {showPinnedIcon ? (
                    <img
                      src={TackIconSvg}
                      alt=""
                      className="svg-icon h-[16px] w-[16px]"
                    />
                  ) : null}

                  {showMutedIcon ? (
                    <img
                      src={BellOffIconSvg}
                      alt=""
                      className="svg-icon h-[16px] w-[16px]"
                    />
                  ) : null}
                </span>
              ) : null}
            </span>

            <span className="flex h-[19px] min-w-[22px] items-center justify-center whitespace-nowrap text-right font-kakao-small text-[12px] leading-[160%] font-normal tracking-[0] text-chat-gray-400">
              {sentAtLabel}
            </span>
          </span>

          <span className="flex items-center justify-between self-stretch">
            <MessagePreview
              lastMessageType={lastMessageType}
              imageCount={imageCount}
              previewImageUrl={previewImageUrl}
              lastMessage={lastMessage}
            />

            {unreadLabel !== undefined ? (
              <CountBadge label={unreadLabel} className="shrink-0" />
            ) : null}
          </span>
        </span>
      </button>
    </div>
  );
}
