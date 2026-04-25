import { useState } from 'react'

import chatBubbleIcon from '@/assets/icons/ChatBubble.svg'
import hashIcon from '@/assets/icons/Hash.svg'
import CollapsibleSectionHeader from '@/components/home/CollapsibleSectionHeader'
import MemberList from '@/components/home/MemberList'
import UpdateSection from '@/components/home/UpdateSection'
import HomeHeader from '@/components/layout/HomeHeader'
import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import { colors } from '@/styles/tokens'

function HomePage() {
  const [isMembersExpanded, setIsMembersExpanded] = useState(false)

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <HomeHeader />

        <div className="flex-1 overflow-y-auto bg-white">
          <UpdateSection />

          <div
            style={{
              padding: '20px',
              borderBottom: `0.6px solid ${colors.grey300}`,
            }}
          >
            <CollapsibleSectionHeader icon={hashIcon} title="토픽" />
          </div>

          {isMembersExpanded ? (
            <div
              className="flex flex-col items-start"
              style={{
                padding: '20px 12px',
                gap: '28px',
                borderBottom: `0.6px solid ${colors.grey300}`,
              }}
            >
              <CollapsibleSectionHeader
                icon={chatBubbleIcon}
                title="팀원 목록"
                isExpanded
                onToggle={() => setIsMembersExpanded((prev) => !prev)}
              />
              <MemberList />
            </div>
          ) : (
            <div
              style={{
                padding: '20px',
                borderBottom: `0.6px solid ${colors.grey300}`,
              }}
            >
              <CollapsibleSectionHeader
                icon={chatBubbleIcon}
                title="팀원 목록"
                isExpanded={false}
                onToggle={() => setIsMembersExpanded((prev) => !prev)}
              />
            </div>
          )}
        </div>

        <NavigationBar />
      </div>
    </PageFrame>
  )
}

export default HomePage
