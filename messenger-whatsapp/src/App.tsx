import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <div className="w-[375px] mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
