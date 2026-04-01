import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListByNameIcon from "@/assets/icons/list_name.svg?react";
import ListByTimeIcon from "@/assets/icons/list_time.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import Header from "@/components/Common/Header";
import SearchBar from "@/components/Common/SearchBar";
import ContactListItem from "@/components/Contact/ContactListItem";
import messagesData from "@/data/messages.json";
import usersData from "@/data/users.json";
import useScrolled from "@/hooks/useScrolled";
import { getLastSeenDisplay, parseTimeToMinutes } from "@/utils/formatDate";
import { getSurname } from "@/utils/getName";

// 메시지 전체를 한 번만 순회해 유저별 최근 접속 정보 Map 구축
const lastSeenMap = new Map<number, { date: string; time: string; minutes: number }>();
for (const room of messagesData.chatRooms) {
  for (const msg of room.messages) {
    const minutes = parseTimeToMinutes(msg.time);
    const current = lastSeenMap.get(msg.userId);
    if (
      !current ||
      msg.date > current.date ||
      (msg.date === current.date && minutes > current.minutes)
    ) {
      lastSeenMap.set(msg.userId, { date: msg.date, time: msg.time, minutes });
    }
  }
}

const contacts = usersData.users
  .filter(u => u.userId !== 1)
  .map(u => {
    const seen = lastSeenMap.get(u.userId) ?? { date: "", time: "", minutes: -1 };
    return {
      ...u,
      lastSeenDate: seen.date,
      lastSeenMinutes: seen.minutes,
      displayByTime: getLastSeenDisplay(seen.date, seen.time),
      displayByName: getLastSeenDisplay(seen.date, seen.time, true),
    };
  });

const sortedByTime = [...contacts].sort((a, b) => {
  if (a.lastSeenDate !== b.lastSeenDate) return b.lastSeenDate.localeCompare(a.lastSeenDate);
  return b.lastSeenMinutes - a.lastSeenMinutes;
});

const sortedByName = [...contacts]
  .sort((a, b) => a.name.localeCompare(b.name, "ko"))
  .map((user, i, arr) => ({
    ...user,
    surnameDisplay:
      i > 0 && getSurname(arr[i - 1].name) === getSurname(user.name)
        ? ("hidden" as const)
        : ("show" as const),
  }));

const ContactPage = () => {
  const { scrolled, handleScroll } = useScrolled();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  const [sortByTime, setSortByTime] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredByTime = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return sortedByTime;
    return sortedByTime.filter(u => u.name.includes(query));
  }, [searchQuery]);

  const filteredByName = useMemo(() => {
    const query = searchQuery.trim();
    const base = query ? sortedByName.filter(u => u.name.includes(query)) : sortedByName;
    return base.map((user, i, arr) => ({
      ...user,
      surnameDisplay:
        i > 0 && getSurname(arr[i - 1].name) === getSurname(user.name)
          ? ("hidden" as const)
          : ("show" as const),
    }));
  }, [searchQuery]);

  return (
    <div className="flex h-full flex-col">
      <Header
        text="연락처"
        rightIcon={<PlusIcon />}
        showShadow={scrolled}
        showSearchIcon={scrolled}
        onSearchIconClick={() => {
          if (mainRef.current) mainRef.current.scrollTop = 0;
        }}
      />
      <main ref={mainRef} className="flex-1 overflow-y-auto scroll-smooth" onScroll={handleScroll}>
        <SearchBar placeholder="Search Contacts" value={searchQuery} onChange={setSearchQuery} />
        <div className="mt-5 mb-28">
          <div className="flex flex-col gap-4">
            {!searchQuery && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="font-body-5 px-4 text-gray-500">내 프로필</span>
                  <ContactListItem
                    name={usersData.users[0].name}
                    profileColor={usersData.users[0].profileColor}
                    lastSeen="온라인"
                    surnameDisplay="none"
                    onClick={() => navigate("/profile")}
                  />
                </div>
                <hr className="mx-auto h-px w-83.75 border-0 bg-gray-100" />
              </>
            )}
            <div className="flex flex-col gap-1">
              {!searchQuery && (
                <div className="flex items-center justify-between px-4">
                  <span className="font-body-5 text-gray-500">
                    {sortByTime ? "마지막 접속 순으로 정렬" : "이름 순으로 정렬"}
                  </span>
                  <button
                    className="cursor-pointer text-gray-500"
                    onClick={() => setSortByTime(prev => !prev)}
                  >
                    {sortByTime ? <ListByNameIcon /> : <ListByTimeIcon />}
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-1">
                {sortByTime
                  ? filteredByTime.map(user => (
                      <ContactListItem
                        key={user.userId}
                        name={user.name}
                        profileColor={user.profileColor}
                        lastSeen={user.displayByTime}
                        surnameDisplay="none"
                      />
                    ))
                  : filteredByName.map(user => (
                      <ContactListItem
                        key={user.userId}
                        name={user.name}
                        profileColor={user.profileColor}
                        lastSeen={user.displayByName}
                        surnameDisplay={searchQuery ? "none" : user.surnameDisplay}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
