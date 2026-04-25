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
        </div>

        <NavigationBar />
      </div>
    </PageFrame>
  )
}

export default HomePage
