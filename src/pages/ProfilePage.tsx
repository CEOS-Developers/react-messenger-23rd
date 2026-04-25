import PageFrame from '@/components/layout/PageFrame'
import ProfileHeader from '@/components/layout/ProfileHeader'
import ProfileSummary from '@/components/profile/ProfileSummary'
import usersData from '@/data/users.json'
import type { User } from '@/types/user'

function ProfilePage() {
  const me = (usersData as User[]).find((u) => u.id === 'me')

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ProfileHeader />
        <div className="flex-1 overflow-y-auto bg-white">
          {me && (
            <div
              className="flex flex-col items-start self-stretch"
              style={{ padding: '12px 0', gap: '16px' }}
            >
              <div
                className="flex flex-col items-start self-stretch"
                style={{ padding: '0 20px', gap: '14px' }}
              >
                <ProfileSummary name={me.name} jobTitle={me.jobTitle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageFrame>
  )
}

export default ProfilePage
