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
    <nav>
      {menus.map((menu) => (
        <Link key={menu.path} to={menu.path}>
          <span>{menu.icon}</span>
          <span>{menu.name}</span>
        </Link>
      ))}
    </nav>
  );
}

//스타일링, 정렬, 하단 sticky
