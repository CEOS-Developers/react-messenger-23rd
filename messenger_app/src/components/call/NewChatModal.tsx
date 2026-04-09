import { useState } from 'react'; // ✨ useState 추가
import userData from '../../data/users.json';
import { imageMap } from '../../utils/imageMaps';
import { getInitialConsonant } from '../../utils/string';

import close_circle from '../../icons/icon_close_circle.svg';
import icon_message from '../../icons/icon_message.svg';
import icon_user_add from '../../icons/icon_user_add.svg';
import icon_community from '../../icons/icon_community.svg';
import search from '../../icons/icon_search.svg';

interface UserSelectModalProps {
  onClose: () => void;
}

const NEW_ITEMS = [
  { id: 'new_chat', label: '새 채팅', icon: icon_message },
  { id: 'new_user', label: '새 연락처', icon: icon_user_add },
  { id: 'new_community', label: '새 커뮤니티', icon: icon_community },
];

export const UserSelectModal = ({ onClose }: UserSelectModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedUsers = [...userData.users].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko-KR')
  );

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.includes(searchQuery)
  );

  const groupedUsers = filteredUsers.reduce(
    (acc, user) => {
      const initial = getInitialConsonant(user.name);
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(user);
      return acc;
    },
    {} as Record<string, typeof userData.users>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full h-[90dvh] bg-Gray200 rounded-t-lg flex flex-col animate-slide-up px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0">
          <div className="flex w-full h-13 py-2.5 justify-between items-end">
            <div className="w-6" />
            <span className="text-heading">새 채팅</span>
            <img
              src={close_circle}
              alt="Close"
              onClick={onClose}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full my-2 h-8.5 bg-Gray300 rounded-[10px] px-2 py-1.25">
            <div className="flex items-center justify-center w-6 h-6 shrink-0">
              <img src={search} alt="Search" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-body-02 text-Gray600 placeholder-opacity-100 outline-none"
              placeholder="이름 검색"
            />
          </div>
        </div>

        {/* --- 스크롤 가능한 리스트 영역 --- */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-2 [&::-webkit-scrollbar]:hidden">
          
          {searchQuery === '' && (
            <div className="w-full rounded-lg bg-white flex flex-col divide-y divide-Gray300 shrink-0">
              {NEW_ITEMS.map(({ id, label, icon }) => (
                <div
                  key={id}
                  className="flex w-full h-12.5 gap-3.75 items-center px-2 py-2.5 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="w-10 h-10 flex justify-center items-center p-2.5 gap-2.5 shrink-0">
                    <img src={icon} alt={label} className="w-6 h-6" />
                  </div>
                  <p className="text-body-02">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* 유저 리스트 */}
          <div>
            {Object.entries(groupedUsers).map(([initial, usersInGroup]) => (
              <div key={initial} className="flex flex-col mb-4">
                <div className="px-2 py-1.5 text-body-04 text-Gray600 font-bold">
                  {initial}
                </div>

                <div className="bg-white rounded-lg flex flex-col divide-y divide-gray-100 overflow-hidden">
                  {usersInGroup.map((user) => {
                    const profileImg = imageMap[user.profileKey] || imageMap['profile_default'];

                    return (
                      <div
                        key={user.id}
                        className="flex items-center px-4 py-2 gap-3.75 self-stretch cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                      >
                        <img
                          src={profileImg}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 bg-gray-200"
                        />
                        <span className="text-body-02">{user.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(groupedUsers).length === 0 && (
              <div className="text-center py-10 text-Gray600 text-body-02">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};