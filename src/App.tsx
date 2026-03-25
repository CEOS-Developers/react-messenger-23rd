import ChatRoomPage from "./pages/ChatRoomPage";

function App() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[375px] h-[812px] flex flex-col relative">
        <ChatRoomPage />
      </div>
    </div>
  );
}

export default App;
