import { useEffect, useState } from 'react'
import FrinedsBar from '@/Friends/FriendsBar'
import FriendsHeader from '@/Friends/FriendsHeader'
import OtherProfile from '@/components/OtherProfile'
import type { Profile } from '@/types/profile'

type TabType = 'all' | 'favorite' | 'chat'

function Friends() {
  const [members, setMembers] = useState<Profile[]>([])
  const [currentTab, setCurrentTab] = useState<TabType>('all')

  useEffect(() => {
    fetch('/data/member.json')
      .then((res) => res.json())
      .then((data) => setMembers(data.members))
      .catch((err) => console.error('에러 발생', err))
  }, [])

  const favoriteMembers = members.filter((member) => member.favorite)

  const visibleMembers =
    currentTab === 'all'
      ? members
      : currentTab === 'favorite'
        ? favoriteMembers
        : []

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <FriendsHeader />
      <FrinedsBar
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        totalCount={members.length}
      />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {visibleMembers.map((member) => (
          <OtherProfile
            key={member.id}
            profile={member}
          />
        ))}
      </div>
    </div>
  )
}
export default Friends
