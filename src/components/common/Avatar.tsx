import activeStatus from '@/assets/icons/State=Active.svg'
import awayStatus from '@/assets/icons/State=Away.svg'
import sleepingStatus from '@/assets/icons/State=Sleeping.svg'
import profileIcon from '@/assets/icons/Profile.svg'
import { colors } from '@/styles/tokens'

type AvatarSize = 'xs' | 's' | 'm' | 'l'

type AvatarProps = {
  size?: AvatarSize
  showStatus?: boolean
  status?: 'active' | 'away' | 'sleeping'
  isGroup?: boolean
}

const sizeMap: Record<
  AvatarSize,
  { container: number; icon: number; statusDot: number; borderRadius: number }
> = {
  xs: { container: 22, icon: 16.5, statusDot: 8, borderRadius: 6 },
  s: { container: 32, icon: 24, statusDot: 13, borderRadius: 8 },
  m: { container: 40, icon: 34, statusDot: 13, borderRadius: 8 },
  l: { container: 56, icon: 34, statusDot: 16, borderRadius: 16 },
}

const statusIconMap = {
  active: activeStatus,
  away: awayStatus,
  sleeping: sleepingStatus,
}

function Avatar({
  size = 'm',
  showStatus = false,
  status = 'active',
  isGroup = false,
}: AvatarProps) {
  const s = sizeMap[size]

  return (
    <div
      className="relative shrink-0"
      style={{
        width: s.container,
        height: s.container,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isGroup ? (
        <div className="relative h-full w-full">
          <div
            className="absolute top-0 left-0 flex items-center justify-center overflow-hidden"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: colors.primary200,
              border: '2px solid white',
            }}
          >
            <img
              src={profileIcon}
              alt="프로필"
              style={{
                width: 22,
                height: 22,
                filter: 'brightness(0) invert(1)',
              }}
            />
          </div>
          <div
            className="absolute right-0 bottom-0 flex items-center justify-center overflow-hidden"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: colors.primary100,
              border: '2px solid white',
            }}
          >
            <img
              src={profileIcon}
              alt="프로필"
              style={{
                width: 22,
                height: 22,
                filter: 'brightness(0) invert(1)',
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden"
          style={{
            borderRadius: s.borderRadius,
            backgroundColor: colors.primary100,
          }}
        >
          <img
            src={profileIcon}
            alt="프로필"
            style={{
              width: s.icon,
              height: s.icon,
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
      )}

      {showStatus && (
        <img
          src={statusIconMap[status]}
          alt={status}
          className="absolute"
          style={{
            width: s.statusDot,
            height: s.statusDot,
            bottom: -4,
            right: -4,
          }}
        />
      )}
    </div>
  )
}

export default Avatar
