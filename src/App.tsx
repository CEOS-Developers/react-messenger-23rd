import { Routes, Route } from "react-router-dom";
import ChatRoomPage from "./pages/ChatRoom";
import ChatListPage from "./pages/ChatList";
import NoticePage from "./components/ChatRoom/Noticepage";
import initialMessages from "../public/data/messages.json";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const isDataLoaded = localStorage.getItem("messages");
    if (!isDataLoaded) {
      //messages가 비어있으면 JSON 파일 내용 가져오기
      localStorage.setItem("messages", JSON.stringify(initialMessages));
      console.log("데이터 로딩 완료");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ChatRoomPage />} />

      <Route path="/chatroom/:id" element={<ChatRoomPage />} />
      <Route path="/chatlist" element={<ChatListPage />} />
      <Route path="/notice-page" element={<NoticePage />} />

      <Route
        path="*"
        element={
          <div className="text-white">404 - 페이지를 찾을 수 없어요</div>
        }
      />
    </Routes>
  );
}

export default App;
