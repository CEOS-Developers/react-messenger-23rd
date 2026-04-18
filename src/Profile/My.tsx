import Profile2 from '@assets/icon-profile2.svg'
import type { Profile } from '@/types/profile'

function My({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-row gap-3 p-4 h-23 border-b- border-gray-20">
      <img
        src={Profile2}
        alt="프로필사진"
      />

      <div className="flex flex-col justify-center items-start">
        <p className="text-title2 antialiased">{profile.name}</p>
        <p className="text-body4_r text-gray-70 antialiased">{profile.major}</p>
      </div>
    </div>
  )
}
export default My
