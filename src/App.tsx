import { Routes, Route, useLocation } from "react-router-dom";
import ChatRoomPage from "./pages/ChatRoom";
import ChatListPage from "./pages/ChatList";
import NoticePage from "./components/ChatRoom/Noticepage";
import initialMessages from "../public/data/messages.json";
import FriendsPage from "./pages/Friends";
import "./App.css";
import { useEffect } from "react";
import NavBar from "./components/common/NavBar";

function App() {
  //최초로 메세지 데이터 가져오기
  useEffect(() => {
    const isDataLoaded = localStorage.getItem("messages");
    if (!isDataLoaded) {
      //messages가 비어있으면 JSON 파일 내용 가져오기
      localStorage.setItem("messages", JSON.stringify(initialMessages));
      console.log("데이터 로딩 완료");
    }
  }, []);

  //네브바 표시 설정
  const location = useLocation();
  const shouldHide = location.pathname.startsWith("/chatroom");

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<ChatRoomPage />} />

        <Route path="/chatroom/:id" element={<ChatRoomPage />} />
        <Route path="/chatlist" element={<ChatListPage />} />
        <Route path="/notice-page" element={<NoticePage />} />
        <Route path="/friends" element={<FriendsPage />} />

        <Route
          path="*"
          element={
            <div className="text-white">404 - 페이지를 찾을 수 없어요</div>
          }
        />
      </Routes>
      {!shouldHide && <NavBar />}
    </div>
  );
}

export default App;
