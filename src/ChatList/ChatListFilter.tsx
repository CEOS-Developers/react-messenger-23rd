const TABS = ['모두', '읽지 않음', '즐겨찾기', '그룹'] as const

type Tab = (typeof TABS)[number]

interface Props {
  activeTab: Tab
  onChangeTab: (tab: Tab) => void
}

function ChatListFilter({ activeTab, onChangeTab }: Props) {
  return (
    <div className="flex flex-row items-center gap-1.5 h-13.5 py-3 px-4">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChangeTab(tab)}
          className={`
            px-3.5 py-1.5 rounded-full whitespace-nowrap antialiased
            ${
              activeTab === tab
                ? 'bg-blue-50 text-white text-body3_sb'
                : 'border border-gray-30 text-gray-80 bg-white text-body3_r'
            }
          `}
        >
          {tab}
        </button>
      ))}

      <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-30 text-gray-60 text-base leading-none">
        +
      </button>
    </div>
  )
}

export default ChatListFilter
export type { Tab }
