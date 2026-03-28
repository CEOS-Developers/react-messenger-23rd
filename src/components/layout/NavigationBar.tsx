import bellIcon from '@/assets/icons/Bell/Default.svg'
import dmDefaultIcon from '@/assets/icons/DM/Default.svg'
import dmSelectedIcon from '@/assets/icons/DM/Selected.svg'
import homeDefaultIcon from '@/assets/icons/Home/Default.svg'
import homeSelectedIcon from '@/assets/icons/Home/Selected.svg'
import moreIcon from '@/assets/icons/Other.svg'
import HomeIndicator from '@/components/common/HomeIndicator'
import { colors, typography } from '@/styles/tokens'
import type { NavigationKey } from '@/types/navigation'

type NavigationBarProps = {
  active?: NavigationKey
  onTabChange?: (tab: NavigationKey) => void
}

function NavigationBar({ active, onTabChange }: NavigationBarProps) {
  const items = [
    {
      key: 'home',
      label: '홈',
      defaultIcon: homeDefaultIcon,
      activeIcon: homeSelectedIcon,
    },
    {
      key: 'dm',
      label: 'DM',
      defaultIcon: dmDefaultIcon,
      activeIcon: dmSelectedIcon,
    },
    {
      key: 'alarm',
      label: '알림',
      defaultIcon: bellIcon,
      activeIcon: bellIcon,
    },
    {
      key: 'more',
      label: '더보기',
      defaultIcon: moreIcon,
      activeIcon: moreIcon,
    },
  ] as const

  return (
    <div
      className="flex h-[94px] w-full flex-col border-t bg-white"
      style={{
        borderTopColor: colors.grey300,
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)',
      }}
    >
      <nav className="h-[60px] w-full">
        <div className="flex w-full items-center justify-between px-[20px] pt-[12px] pb-[4px]">
          {items.map((item) => {
            const isActive = active === item.key

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onTabChange?.(item.key)}
                className="flex h-[44px] w-[80px] flex-col items-center gap-[4px]"
              >
                <img
                  src={isActive ? item.activeIcon : item.defaultIcon}
                  alt={item.label}
                  className="block h-[20px] w-[20px] shrink-0 object-contain"
                />

                <span
                  className="text-center"
                  style={{
                    color: isActive ? colors.primary700 : colors.grey800,
                    fontSize: typography.c2_11_sb.fontSize,
                    fontWeight: typography.c2_11_sb.fontWeight,
                    lineHeight: typography.c2_11_sb.lineHeight,
                  }}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      <div className="flex h-[34px] items-center justify-center">
        <HomeIndicator />
      </div>
    </div>
  )
}

export default NavigationBar