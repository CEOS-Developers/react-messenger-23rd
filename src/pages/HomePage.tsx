import chatBubbleIcon from '@/assets/icons/ChatBubble.svg'
import hashIcon from '@/assets/icons/Hash.svg'
import CollapsibleSectionHeader from '@/components/home/CollapsibleSectionHeader'
import UpdateSection from '@/components/home/UpdateSection'
import HomeHeader from '@/components/layout/HomeHeader'
import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'

function HomePage() {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <HomeHeader />

        <div className="flex-1 overflow-y-auto bg-white">
          <UpdateSection />
          <CollapsibleSectionHeader icon={hashIcon} title="토픽" />
          <CollapsibleSectionHeader icon={chatBubbleIcon} title="팀원 목록" />
        </div>

        <NavigationBar />
      </div>
    </PageFrame>
  )
}

export default HomePage
