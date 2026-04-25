import dmIcon from '@/assets/icons/DM/Default.svg'
import editIcon from '@/assets/icons/Edit.svg'
import PageFrame from '@/components/layout/PageFrame'
import ProfileHeader from '@/components/layout/ProfileHeader'
import ContactSection from '@/components/profile/ContactSection'
import ProfileActionCard from '@/components/profile/ProfileActionCard'
import ProfileSummary from '@/components/profile/ProfileSummary'
import SlackInfoSection from '@/components/profile/SlackInfoSection'
import StatusRow from '@/components/profile/StatusRow'
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
                <StatusRow status={me.status} />
                <div
                  className="flex items-center self-stretch"
                  style={{ gap: '16px' }}
                >
                  <ProfileActionCard icon={dmIcon} label="나에게 메세지" />
                  <ProfileActionCard icon={editIcon} label="프로필 편집하기" />
                </div>
              </div>

              {me.email && me.phone && (
                <ContactSection email={me.email} phone={me.phone} />
              )}

              <SlackInfoSection />
            </div>
          )}
        </div>
      </div>
    </PageFrame>
  )
}

export default ProfilePage
