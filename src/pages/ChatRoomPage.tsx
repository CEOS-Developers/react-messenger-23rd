import AppBar from "../components/chatpage/AppBar";
import MessageNavBar from "../components/chatpage/messageNavBar";
import MessageSend from "../components/chatpage/messageSend";

function ChatRoomPage() {
  return (
    <div className="chatPage">
      <AppBar />
      <MessageSend />
      <MessageNavBar />
    </div>
  );
}

export default ChatRoomPage;
