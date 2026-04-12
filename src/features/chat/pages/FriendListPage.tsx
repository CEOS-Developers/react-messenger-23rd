import { useState, type ReactNode } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import BottomNavigator from "@/features/chat/components/chat-list/BottomNavigator";
import type { BottomNavigationTab } from "@/features/chat/components/chat-list/BottomNavigator";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import ProfileImageSvg from "@/assets/icons/ProfileImage.svg";
import ProfileImageOnePng from "@/assets/images/ProfileImage_1.png";
import ProfileImageTwoPng from "@/assets/images/ProfileImage_2.png";
import ProfileImageThreePng from "@/assets/images/ProfileImage_3.png";
import BirthIconSvg from "@/assets/icons/ic_Birth.svg";
import GiftIconSvg from "@/assets/icons/ic_Gift.svg";
import ChevronDownIconSvg from "@/assets/icons/ic_Chevron_Down.svg";
import ChevronRightIconSvg from "@/assets/icons/ic_Chevron_Right.svg";
import ChevronUpIconSvg from "@/assets/icons/ic_Chevron_Up.svg";
import EditIconSvg from "@/assets/icons/ic_Edit.svg";
import SearchIconSvg from "@/assets/icons/ic_Search.svg";
import SettingIconSvg from "@/assets/icons/ic_Setting.svg";
import UserPlusIconSvg from "@/assets/icons/ic_UserPlus.svg";

type FriendListPageProps = {
  chatNotificationLabel: string;
  onOpenChatList?: () => void;
  onOpenMyProfile?: () => void;
};

type FriendStory = {
  name: string;
  profileImage: string;
  showDot?: boolean;
  showCake?: boolean;
};

type SavedFriendGroup = {
  label: string;
  friends: SavedFriend[];
};

type SavedFriend = {
  name: string;
  profileImage: string;
};

const FRIEND_STORIES: FriendStory[] = [
  {
    name: "아무개아무개",
    profileImage: ProfileImageSvg,
    showDot: true,
  },
  {
    name: "아무개",
    profileImage: ProfileImageOnePng,
    showCake: true,
  },
  {
    name: "아무개",
    profileImage: ProfileImageSvg,
    showDot: true,
  },
  {
    name: "아무개아",
    profileImage: ProfileImageTwoPng,
    showCake: true,
  },
  {
    name: "아무개",
    profileImage: ProfileImageSvg,
    showCake: true,
  },
];

const SAVED_FRIEND_GROUPS: SavedFriendGroup[] = [
  {
    label: "가족",
    friends: [
      {
        name: "날쌩아저씨",
        profileImage: ProfileImageSvg,
      },
      {
        name: "삼겹살대마왕",
        profileImage: ProfileImageSvg,
      },
      {
        name: "짱아",
        profileImage: ProfileImageSvg,
      },
      {
        name: "흰둥이",
        profileImage: ProfileImageSvg,
      },
    ],
  },
  {
    label: "친구",
    friends: [
      {
        name: "이빵",
        profileImage: ProfileImageSvg,
      },
      {
        name: "엄마",
        profileImage: ProfileImageSvg,
      },
      {
        name: "금수1",
        profileImage: ProfileImageSvg,
      },
      {
        name: "금수2",
        profileImage: ProfileImageSvg,
      },
      {
        name: "금수3",
        profileImage: ProfileImageSvg,
      },
      {
        name: "금수4",
        profileImage: ProfileImageSvg,
      },
    ],
  },
];

function HeaderIconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex shrink-0 items-center gap-[10px] p-[8px]"
    >
      {children}
    </button>
  );
}

function FriendStoryItem({
  name,
  profileImage,
  showDot = false,
  showCake = false,
}: FriendStory) {
  return (
    <li className="relative flex w-[64px] shrink-0 flex-col items-center justify-center gap-[4px]">
      <div className="flex h-[48px] w-[64px] items-center justify-center">
        <img
          src={profileImage}
          alt=""
          className="aspect-square h-[48px] w-[48px] rounded-[16px] object-cover"
        />

        {showDot ? (
          <span className="absolute top-0 right-[8px] h-[8px] w-[8px] rounded-[100px] bg-chat-accent-200" />
        ) : null}

        {showCake ? (
          <img
            src={BirthIconSvg}
            alt=""
            className="svg-icon absolute right-0 bottom-[19px] h-[24px] w-[24px]"
          />
        ) : null}
      </div>

      <span
        className="line-clamp-1 max-h-[22px] max-w-[64px] text-center font-kakao-small text-[12px] leading-[160%] font-bold tracking-[-0.48px] text-chat-black"
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        {name}
      </span>
    </li>
  );
}

function SavedFriendProfileItem({ name, profileImage }: SavedFriend) {
  return (
    <li className="flex w-[64px] flex-col items-center justify-center gap-[4px]">
      <img
        src={profileImage}
        alt=""
        className="aspect-square h-[48px] w-[48px] rounded-[16px] object-cover"
      />

      <span
        className="line-clamp-1 max-h-[22px] max-w-[64px] text-center font-kakao-small text-[12px] leading-[160%] font-bold tracking-[-0.48px] text-chat-black"
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        {name}
      </span>
    </li>
  );
}

function SavedFriendGroupItem({
  label,
  friends,
  isExpanded,
  onToggle,
}: SavedFriendGroup & {
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const friendCount = friends.length;

  return (
    <div
      className={`flex w-[343px] flex-col items-center justify-center gap-[16px] rounded-[8px] bg-chat-gray-50 pt-[12px] ${
        isExpanded ? "pb-[16px]" : "pb-[12px]"
      }`}
    >
      <div className="flex items-center justify-between self-stretch px-[20px]">
        <div className="flex items-center gap-[8px] pb-[2px]">
          <span
            className="font-kakao-small text-[16px] leading-[160%] font-bold tracking-[-0.64px] text-chat-black"
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {label}
          </span>
          <span
            className="font-kakao-small text-[16px] leading-[160%] font-bold tracking-[-0.64px] text-chat-gray-400"
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {friendCount}
          </span>
        </div>

        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label={`${label} ${isExpanded ? "접기" : "펼치기"}`}
          onClick={onToggle}
          className="flex h-[24px] w-[24px] items-center justify-center"
        >
          <img
            src={isExpanded ? ChevronUpIconSvg : ChevronDownIconSvg}
            alt=""
            className="svg-icon h-[24px] w-[24px]"
          />
        </button>
      </div>

      {isExpanded ? (
        <ul className="m-0 flex list-none flex-wrap content-center items-center gap-x-[16px] gap-y-[12px] self-stretch p-0 pl-[18px]">
          {friends.map((friend) => (
            <SavedFriendProfileItem key={friend.name} {...friend} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function FriendListPage({
  chatNotificationLabel,
  onOpenChatList,
  onOpenMyProfile,
}: FriendListPageProps) {
  const [expandedGroupLabels, setExpandedGroupLabels] = useState<string[]>([]);

  const toggleSavedFriendGroup = (label: string) => {
    setExpandedGroupLabels((currentLabels) =>
      currentLabels.includes(label)
        ? currentLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentLabels, label]
    );
  };

  return (
    <MobileLayout>
      <div className="flex h-full w-full flex-col bg-chat-white">
        <StatusBar backgroundColor="white" />

        <header className="flex shrink-0 items-center justify-between self-stretch bg-chat-white p-[16px]">
          <button
            type="button"
            aria-label="내 프로필 열기"
            onClick={onOpenMyProfile}
            className="flex min-w-0 items-center gap-[8px] border-0 bg-transparent p-0 text-left"
          >
            <img
              src={ProfileImageThreePng}
              alt=""
              className="aspect-square h-[40px] w-[40px] shrink-0 rounded-[12px] object-cover"
            />

            <h1
              className="truncate font-kakao-big text-[20px] leading-[140%] font-bold tracking-[-0.8px] text-chat-black"
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              신짱구
            </h1>
          </button>

          <div className="flex shrink-0 items-center gap-[4px]">
            <HeaderIconButton label="친구 추가">
              <img
                src={UserPlusIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </HeaderIconButton>
            <HeaderIconButton label="선물">
              <img
                src={GiftIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </HeaderIconButton>
            <HeaderIconButton label="설정">
              <img
                src={SettingIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </HeaderIconButton>
          </div>
        </header>

        <main className="scrollbar-hidden flex min-h-0 w-full flex-1 flex-col items-start gap-[32px] overflow-y-auto bg-chat-white pt-[24px] pr-0 pb-[120px] pl-[16px]">
          <section className="flex w-[343px] max-w-[calc(100%-16px)] flex-col items-start gap-[16px]">
            <div className="flex items-end justify-center gap-[8px]">
              <h2
                className="font-kakao-big text-[18px] leading-[140%] font-bold tracking-[-0.72px] text-chat-black"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                친구 목록
              </h2>
              <span
                className="font-kakao-big text-[18px] leading-[140%] font-bold tracking-[-0.72px] text-chat-gray-400"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                000
              </span>
              <img
                src={ChevronRightIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </div>

            <label className="flex w-full items-center justify-between self-stretch rounded-[8px] bg-chat-gray-50 px-[16px] py-[12px]">
              <span className="sr-only">친구 검색</span>
              <input
                type="text"
                placeholder="검색하기"
                className="min-w-0 flex-1 bg-transparent font-kakao-small text-[14px] leading-[160%] font-normal tracking-[-0.56px] text-chat-black placeholder:text-chat-gray-500 focus:outline-none"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              />
              <img
                src={SearchIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </label>
          </section>

          <section className="flex w-[343px] max-w-[calc(100%-16px)] flex-col gap-[16px]">
            <h2
              className="self-stretch font-kakao-big text-[18px] leading-[140%] font-bold tracking-[-0.72px] text-chat-black"
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              친구 소식
            </h2>

            <ul className="scrollbar-hidden flex items-center gap-[8px] self-stretch overflow-x-auto">
              {FRIEND_STORIES.map((story, index) => (
                <FriendStoryItem key={`${story.name}-${index}`} {...story} />
              ))}
            </ul>
          </section>

          <section className="flex w-[343px] max-w-[calc(100%-16px)] flex-col items-start gap-[16px]">
            <div className="flex h-[25px] items-center justify-between self-stretch">
              <h2
                className="font-kakao-big text-[18px] leading-[140%] font-bold tracking-[-0.72px] text-chat-black"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                저장한 친구
              </h2>

              <button
                type="button"
                aria-label="저장한 친구 편집"
                className="flex items-center gap-[10px] p-[10px]"
              >
                <img
                  src={EditIconSvg}
                  alt=""
                  className="svg-icon h-[20px] w-[20px]"
                />
              </button>
            </div>

            <div className="flex flex-col items-start gap-[8px]">
              {SAVED_FRIEND_GROUPS.map((group) => (
                <SavedFriendGroupItem
                  key={group.label}
                  {...group}
                  isExpanded={expandedGroupLabels.includes(group.label)}
                  onToggle={() => toggleSavedFriendGroup(group.label)}
                />
              ))}
            </div>
          </section>
        </main>

        <BottomNavigator
          activeTab="friends"
          chatNotificationLabel={chatNotificationLabel}
          onSelectTab={(tab: BottomNavigationTab) => {
            if (tab === "chat") {
              onOpenChatList?.();
            }
          }}
        />
      </div>
    </MobileLayout>
  );
}
