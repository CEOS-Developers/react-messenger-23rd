import { useLocation, useNavigate } from 'react-router-dom'
import NavProfile from '@assets/NavProfile.svg'
import NavChat from '@assets/NavChat.svg'
import NavFile from '@assets/NavFile.svg'
import NavEtc from '@assets/NavEtc.svg'
import NavSetting from '@assets/NavSetting.svg'

type NavItem = {
  path?: string
  icon: string
  name?: string
}

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    { path: '/myprofile', icon: NavProfile, name: 'Profile' },
    { path: '/chatlist', icon: NavChat, name: 'ChatList' },
    { icon: NavFile, name: 'FileIcon' },
    { icon: NavEtc, name: 'EtcIcon' },
    { icon: NavSetting, name: 'SettingIcon' },
  ]

  return (
    <footer className="h-[84px] px-4 pt-2 bg-gray-10 border-t-[0.25px] border-gray-30 flex justify-around items-center">
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
            <img
              src={item.icon}
              alt={item.name}
              className={`w-[40px] h-[40px] ${isActive ? 'opacity-100' : 'opacity-40'}`}
            />
          </button>
        )
      })}
    </footer>
  )
}
