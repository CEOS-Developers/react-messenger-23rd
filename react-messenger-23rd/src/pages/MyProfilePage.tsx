import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useChatStore } from "@/stores/useChatStore";
import StatusBar from "@/components/StatusBar";
import friendsData from "@/data/friends.json";
import IconBack from "@/assets/icons/icon_back.svg?react";
import IconEditProfile from "@/assets/icons/icon_edit_profile.svg?react";
import IconEtc from "@/assets/icons/icon_etc.svg?react";
import IconFacebook from "@/assets/icons/icon_facebook.svg?react";
import IconMessenger from "@/assets/icons/icon_messenger.svg?react";
import IconUserMe from "@/assets/icons/icon_user_me.svg?react";
import IconUp from "@/assets/icons/icon_up.svg?react";
import IconDown from "@/assets/icons/icon_down.svg?react";
import IconLocation from "@/assets/icons/icon_location.svg?react";
import IconJob from "@/assets/icons/icon_job.svg?react";
import IconBirthday from "@/assets/icons/icon_birthday.svg?react";
import emptyPostImg from "@/assets/images/empty-post.jpg";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { getUserById, currentUserId } = useUserStore();
  const { chatRooms, setActiveChatRoom } = useChatStore();
  const currentUser = getUserById(0);
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [postsExpanded, setPostsExpanded] = useState(true);

  const friendCount = friendsData.friendIds.length;
  const postCount = currentUser?.postCount ?? 0;

  const handleChatWithMe = () => {
    const myRoom = chatRooms.find(
      (r) =>
        r.participantIds.length === 2 &&
        r.participantIds.includes(0) &&
        r.participantIds.includes(currentUserId),
    );
    if (myRoom) {
      setActiveChatRoom(myRoom.id);
      navigate(`/chat/${myRoom.id}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-02">
      <StatusBar />

      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 h-12">
        <button onClick={() => navigate(-1)}>
          <IconBack className="w-6 h-6" aria-label="뒤로가기" />
        </button>
        <div className="flex items-center gap-4">
          <button>
            <IconFacebook className="w-6 h-6" aria-label="페이스북" />
          </button>
          <button>
            <IconEtc className="w-6 h-6" aria-label="더보기" />
          </button>
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-13 flex justify-center">
          <div className="absolute bottom-0 translate-y-1/2 z-10 w-22 h-22 rounded-full overflow-hidden border-4 border-white">
            <IconUserMe className="w-full h-full" aria-label="내 프로필" />
          </div>
        </div>

        {/* 흰색 카드 */}
        <div className="bg-white rounded-t-2xl min-h-[calc(100%-3.25rem)]">
          <div className="flex flex-col items-center px-5 pt-14 pb-6 gap-5">
            {/* 이름 + 상태 + 친구수 + 버튼 */}
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col items-center gap-3">
                <span className="text-h1 text-content-primary">
                  {currentUser?.name}
                </span>

                {/* 상태 메시지 */}
                <div className="flex items-center h-7.75 px-2.5 py-2.5 bg-surface-subtle rounded-2xl">
                  <span className="text-caption2 text-content-tertiary underline">
                    {currentUser?.statusMessage || "상태 메시지를 입력해주세요"}
                  </span>
                </div>

                {/* 친구 수 · 게시물 수 */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-body2-m font-semibold text-content-secondary tracking-[-0.02em]">
                      {friendCount}
                    </span>
                    <span className="text-body2-m text-content-secondary tracking-[-0.02em]">
                      친구
                    </span>
                  </div>
                  <span className="text-body2-m text-content-secondary">·</span>
                  <div className="flex items-center gap-1">
                    <span className="text-body2-m font-semibold text-content-secondary tracking-[-0.02em]">
                      {postCount}
                    </span>
                    <span className="text-body2-m text-content-secondary tracking-[-0.02em]">
                      게시물
                    </span>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-2 w-full">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary rounded-lg"
                  onClick={handleChatWithMe}
                >
                  <IconMessenger className="w-6 h-6" aria-hidden="true" />
                  <span className="text-body2-m text-white">나와의 채팅</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-muted rounded-lg">
                  <IconEditProfile className="w-6 h-6" aria-hidden="true" />
                  <span className="text-body2-m text-content-tertiary">
                    프로필 편집
                  </span>
                </button>
              </div>
            </div>

            {/* 개인정보 + 게시물 */}
            <div className="flex flex-col w-full -mx-5">
              {/* 개인정보 섹션 */}
              <div className="flex flex-col gap-4 px-5 py-4 border-t border-line-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-body3-m text-content-secondary">
                    개인정보
                  </span>
                  <button onClick={() => setInfoExpanded((prev) => !prev)}>
                    {infoExpanded ? (
                      <IconUp className="w-5 h-5" aria-label="접기" />
                    ) : (
                      <IconDown className="w-5 h-5" aria-label="펼치기" />
                    )}
                  </button>
                </div>

                {infoExpanded && (
                  <div className="flex flex-col gap-4">
                    {currentUser?.location && (
                      <div className="flex items-center gap-2">
                        <IconLocation className="w-6 h-6" aria-hidden="true" />
                        <span className="text-body3-m text-content-secondary">
                          {currentUser.location}
                        </span>
                      </div>
                    )}
                    {currentUser?.school && (
                      <div className="flex items-center gap-2">
                        <IconJob className="w-6 h-6" aria-hidden="true" />
                        <span className="text-body3-m text-content-secondary">
                          {currentUser.school}
                        </span>
                      </div>
                    )}
                    {currentUser?.birthday && (
                      <div className="flex items-center gap-2">
                        <IconBirthday className="w-6 h-6" aria-hidden="true" />
                        <span className="text-body3-m text-content-secondary">
                          {currentUser.birthday}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 게시물 섹션 */}
              <div className="flex flex-col gap-4 px-5 py-4 border-t border-line-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-body3-m text-content-secondary">
                    게시물
                  </span>
                  <button onClick={() => setPostsExpanded((prev) => !prev)}>
                    {postsExpanded ? (
                      <IconUp className="w-5 h-5" aria-label="접기" />
                    ) : (
                      <IconDown className="w-5 h-5" aria-label="펼치기" />
                    )}
                  </button>
                </div>

                {postsExpanded && (
                  <div className="grid grid-cols-3 gap-2.75">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <img
                        key={i}
                        src={emptyPostImg}
                        alt={`게시물 ${i + 1}`}
                        className="aspect-square rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
