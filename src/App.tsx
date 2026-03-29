import ChatRoomPage from "./pages/ChatRoomPage";

function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="relative flex h-[var(--screen-height)] w-[var(--screen-width)] flex-col">
        <ChatRoomPage />
      </div>
    </div>
  );
}

export default App;
