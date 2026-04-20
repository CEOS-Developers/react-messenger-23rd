import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation(); // 현재 위치에 따라 아이콘 색상을 바꾸기 위해

  const menus = [
    { name: "채팅", path: "/chat-list", icon: "💬" },
    { name: "대화 상대", path: "/friends", icon: "👥" },
    { name: "검색", path: "", icon: "🔍" },
    { name: "나", path: "/profile", icon: "👤" },
  ];

  return (
    <nav className="fixed bottom-0 w-full flex justify-center px-7 gap-11 pt-3 pb-9 bg-gray80">
      {menus.map((menu) => (
        <Link key={menu.path} to={menu.path}>
          <div
            className={`flex flex-col items-center ${
              location.pathname === menu.path ? "text-main2" : "text-gray10"
            }`}
          >
            <span className="text-2xl">{menu.icon}</span>
            <span className="text-xs">{menu.name}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
