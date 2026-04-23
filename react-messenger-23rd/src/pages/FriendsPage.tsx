import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import StatusBar from "@/components/StatusBar";
import BottomNav from "@/components/BottomNav";
import friendsData from "@/data/friends.json";
import type { User } from "@/types";
import IconAddFriend from "@/assets/icons/icon_add_friend.svg?react";
import IconAddStory from "@/assets/icons/icon_add_story.svg?react";
import IconFacebook from "@/assets/icons/icon_facebook.svg?react";
import IconNotification from "@/assets/icons/icon_notification.svg?react";
import IconUserChat from "@/assets/icons/icon_user_chat.svg?react";
import IconUserMe from "@/assets/icons/icon_user_me.svg?react";
import IconUserStory from "@/assets/icons/icon_user_story.svg?react";
import IconUp from "@/assets/icons/icon_up.svg?react";
import IconDown from "@/assets/icons/icon_down.svg?react";

// 스토리 아이템 (내 스토리)
const MyStoryItem = ({ hasStory }: { hasStory: boolean }) => (
  <div className="flex flex-col items-center gap-1 shrink-0">
    <div className="relative w-18 h-18">
      <div className="w-18 h-18 rounded-full overflow-hidden">
        {hasStory ? (
          <IconUserStory className="w-full h-full" aria-hidden="true" />
        ) : (
          <IconUserChat className="w-full h-full" aria-hidden="true" />
        )}
      </div>
      {hasStory && (
        <IconAddStory className="absolute bottom-0 right-0 w-6 h-6" aria-hidden="true" />
      )}
    </div>
    <span className="text-body3-m text-content-hint text-center">
      내 스토리
    </span>
  </div>
);

// 스토리 아이템 (친구)
const FriendStoryItem = ({ user }: { user: User }) => (
  <div className="flex flex-col items-center gap-1 shrink-0">
    <div className="w-18 h-18 rounded-full overflow-hidden shrink-0">
      <IconUserStory className="w-full h-full" aria-label={user.name} />
    </div>
    <span className="text-body3-m text-content-secondary text-center">
      {user.name}
    </span>
  </div>
);

// 친구 목록 아이템
const FriendListItem = ({ user }: { user: User }) => (
  <div className="flex items-center justify-between px-5 py-2 h-15">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
        <IconUserChat className="w-full h-full" aria-label={user.name} />
      </div>
      <span className="text-body2-m text-content-primary">
        {user.name}
      </span>
    </div>
    {user.statusMessage && (
      <div className="px-2.5 py-2.5 bg-surface-subtle rounded-[16px_16px_16px_0px]">
        <span className="text-caption2 text-content-tertiary">
          {user.statusMessage}
        </span>
      </div>
    )}
  </div>
);

// 추천 친구 아이템
const RecommendedItem = ({ user }: { user: User }) => (
  <div className="flex items-center justify-between px-5 py-2 h-15">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
        <IconUserChat className="w-full h-full" aria-label={user.name} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body2-m text-content-primary">
          {user.name}
        </span>
        <span className="text-caption2 text-content-tertiary">
          함께 아는 친구 10명
        </span>
      </div>
    </div>
    <button className="px-3 py-1.5 bg-primary rounded-lg">
      <span className="text-caption1 text-white">친구 추가</span>
    </button>
  </div>
);

interface SectionState {
  friendsExpanded: boolean;
  recommendedExpanded: boolean;
}

type SectionAction =
  | { type: "TOGGLE_FRIENDS" }
  | { type: "TOGGLE_RECOMMENDED" };

function sectionReducer(state: SectionState, action: SectionAction): SectionState {
  switch (action.type) {
    case "TOGGLE_FRIENDS":
      return { ...state, friendsExpanded: !state.friendsExpanded };
    case "TOGGLE_RECOMMENDED":
      return { ...state, recommendedExpanded: !state.recommendedExpanded };
  }
}

export default function FriendsPage() {
  const navigate = useNavigate();
  const { getUserById } = useUserStore();
  const currentUser = getUserById(0);
  const [{ friendsExpanded, recommendedExpanded }, dispatch] = useReducer(
    sectionReducer,
    { friendsExpanded: true, recommendedExpanded: true },
  );

  const friends = friendsData.friendIds
    .map((id) => getUserById(id))
    .filter((u): u is User => u !== undefined);

  const recommended = friendsData.recommendedIds
    .map((id) => getUserById(id))
    .filter((u): u is User => u !== undefined);

  const storyFriends = friendsData.storyIds
    .map((id) => getUserById(id))
    .filter((u): u is User => u !== undefined);

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 h-12">
        <span
          className="text-h1-logo"
          style={{ color: "var(--color-primary)" }}
        >
          messenger
        </span>
        <div className="flex items-center gap-4">
          <button>
            <IconNotification className="w-6 h-6" aria-label="알림" />
          </button>
          <button>
            <IconAddFriend className="w-6 h-6" aria-label="친구 추가" />
          </button>
          <button>
            <IconFacebook className="w-6 h-6" aria-label="페이스북" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* 내 프로필 */}
        <div
          className="flex items-center justify-between px-5 py-2 h-15 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
              <IconUserMe className="w-full h-full" aria-label="내 프로필" />
            </div>
            <span className="text-body1-sb text-content-primary">
              {currentUser?.name}
            </span>
          </div>
        </div>

        {/* 스토리 섹션 */}
        <div
          className="flex items-center gap-3 px-3 py-5 overflow-x-auto bg-gray-00 border-y border-line-subtle"
        >
          <MyStoryItem hasStory={friendsData.myHasStory} />
          {storyFriends.map((friend) => (
            <FriendStoryItem key={friend.id} user={friend} />
          ))}
        </div>

        {/* 친구 섹션 */}
        <div className="flex flex-col py-4 gap-4">
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center gap-1">
              <span className="text-body2-m text-content-secondary">
                친구
              </span>
              <span className="text-body2-m font-medium text-content-secondary">
                {friends.length}
              </span>
            </div>
            <button onClick={() => dispatch({ type: "TOGGLE_FRIENDS" })}>
              {friendsExpanded ? (
                <IconUp className="w-5 h-5" aria-label="접기" />
              ) : (
                <IconDown className="w-5 h-5" aria-label="펼치기" />
              )}
            </button>
          </div>

          {friendsExpanded && (
            <div className="flex flex-col">
              {friends.map((friend) => (
                <FriendListItem key={friend.id} user={friend} />
              ))}
            </div>
          )}
        </div>

        {/* 추천 친구 섹션 */}
        <div
          className="flex flex-col py-4 gap-4 border-y border-line-subtle"
        >
          <div className="flex items-center justify-between px-5">
            <span className="text-body2-m text-content-secondary">
              추천 친구
            </span>
            <button onClick={() => dispatch({ type: "TOGGLE_RECOMMENDED" })}>
              {recommendedExpanded ? (
                <IconUp className="w-5 h-5" aria-label="접기" />
              ) : (
                <IconDown className="w-5 h-5" aria-label="펼치기" />
              )}
            </button>
          </div>

          {recommendedExpanded && (
            <div className="flex flex-col">
              {recommended.map((user) => (
                <RecommendedItem key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}
