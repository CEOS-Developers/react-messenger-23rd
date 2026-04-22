import { FiSettings, FiChevronRight } from "react-icons/fi"; // 톱니바퀴, 화살표 아이콘
import { AiOutlineCodeSandbox, AiOutlineAppstore } from "react-icons/ai"; // 즐겨찾기, 스토어 아이콘
import { RiWechatPayFill, RiQrCodeLine, RiLeafLine } from "react-icons/ri"; // 결제, QR, 모멘트 아이콘
import { MdWorkOutline } from "react-icons/md"; // 워크 아이콘
import { HiOutlineEmojiHappy } from "react-icons/hi"; // 스티커 아이콘

interface MenuItem {
  icon: React.ReactNode;
  label: string;
}

export default function ProfilePage() {
  const menuItems: MenuItem[] = [
    {
      icon: <AiOutlineCodeSandbox className="w-6 h-6 text-gray10" />,
      label: "즐겨찾기",
    },
    { icon: <RiLeafLine className="w-6 h-6 text-gray10" />, label: "모멘트" },
    { icon: <MdWorkOutline className="w-6 h-6 text-gray10" />, label: "워크" },
    {
      icon: <AiOutlineAppstore className="w-6 h-6 text-gray10" />,
      label: "스토어 및 카드",
    },
    {
      icon: <HiOutlineEmojiHappy className="w-6 h-6 text-gray10" />,
      label: "스티커 및 갤러리",
    },
  ];

  return (
    <main className="flex flex-col h-screen px-5 pt-12 pb-10 overflow-y-auto">
      {/* 상단 프로필 */}
      <header className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <img
            src="/images/profiles/leewoorim.png"
            alt="내 프로필"
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-heading-01 font-bold text-gray10">우림</h1>
            <p className="text-body-02 text-gray50">ID: woorim1215</p>
          </div>
        </div>
        <button className="text-gray10 p-1">
          <FiSettings className="w-6 h-6" />
        </button>
      </header>

      {/* 중간 결제/QR */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        {/* Wechat Pay */}
        <div className="flex flex-col items-center justify-center gap-2 bg-gray80 rounded-2xl py-6 cursor-pointer hover:bg-gray70 transition-colors">
          <RiWechatPayFill className="w-8 h-8 text-main1" />
          <span className="text-body-02 text-gray10 font-medium">
            Wechat Pay
          </span>
        </div>
        {/* QR Code */}
        <div className="flex flex-col items-center justify-center gap-2 bg-gray80 rounded-2xl py-6 cursor-pointer hover:bg-gray70 transition-colors">
          <RiQrCodeLine className="w-8 h-8 text-gray10" />
          <span className="text-body-02 text-gray10 font-medium">QR</span>
        </div>
      </section>

      {/* 하단 메뉴 리스트 */}
      <section className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex justify-between items-center bg-gray80 rounded-2xl px-5 py-4 w-full group hover:bg-gray70 transition-colors"
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <span className="text-body-01 text-gray10 font-medium">
                {item.label}
              </span>
            </div>
            <FiChevronRight className="w-5 h-5 text-gray50 group-hover:text-gray10 transition-colors" />
          </button>
        ))}
      </section>
    </main>
  );
}
