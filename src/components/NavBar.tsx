import { useLocation, useNavigate } from 'react-router-dom'
import NavProfile from '@assets/NavProfile.svg'
import NavProfileClicked from '@assets/NavProfile_filled.svg'
import NavChat from '@assets/icon-navchat.svg'
import NavChatClicked from '@assets/icon-navchat-filled.svg'
import NavFile from '@assets/NavFile.svg'
import NavFileClicked from '@assets/NavFile_filled.svg'
import NavEtc from '@assets/NavEtc.svg'
import NavEtcClicked from '@assets/NavEtc_filled.svg'
import NavSetting from '@assets/NavSetting.svg'
import NavSettingClicked from '@assets/NavSetting_filled.svg'

type NavItem = {
  path?: string
  icon: string
  iconFilled: string
  name?: string
  iconSize?: string
}

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    {
      path: '/myprofile',
      icon: NavProfile,
      iconFilled: NavProfileClicked,
      name: 'Profile',
    },
    {
      path: '/chatlist',
      icon: NavChat,
      iconFilled: NavChatClicked,
      name: 'ChatList',
      iconSize: 'w-5 h-5',
    },
    {
      path: '/file',
      icon: NavFile,
      iconFilled: NavFileClicked,
      name: 'FileIcon',
    },
    { path: '/apps', icon: NavEtc, iconFilled: NavEtcClicked, name: 'EtcIcon' },
    {
      path: '/setting',
      icon: NavSetting,
      iconFilled: NavSettingClicked,
      name: 'SettingIcon',
    },
  ]

  return (
    <footer className="h-21 px-4 pt-2 bg-gray-10 border-t-[0.25px] border-gray-30 flex justify-between items-start">
      {navItems.map((item, index) => {
        const isActive = item.path
          ? location.pathname.startsWith(item.path)
          : false

        return (
          <button
            key={item.path ?? index}
            onClick={() => {
              if (item.path) {
                navigate(item.path)
              }
            }}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={isActive ? item.iconFilled : item.icon}
                alt={item.name}
                className={`${item.iconSize ?? 'w-10 h-10'} ${isActive ? 'opacity-100' : 'opacity-40'}`}
              />
            </div>
          </button>
        )
      })}
    </footer>
  )
}
