import ProfileHeader from '@/Profile/ProfileHeader'
import My from '@/Profile/My'
import Member from '@/Profile/Member'
import Favorites from '@/Profile/Favorites'
import Todo from '@/Profile/Todo'
import Schedule from '@/Profile/Schedule'

function MyProfile() {
  return (
    <>
      <ProfileHeader />
      <My
        profile={{
          id: 1,
          name: '김은홍',
          major: '글로벌한국학과',
          favorite: false,
        }}
      />
      <Member />
      <Favorites />
      <Todo />
      <Schedule />
    </>
  )
}
export default MyProfile
