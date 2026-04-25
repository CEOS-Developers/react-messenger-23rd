import PageFrame from '@/components/layout/PageFrame'

function ProfilePage() {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <div className="flex-1 overflow-y-auto bg-white" />
      </div>
    </PageFrame>
  )
}

export default ProfilePage
