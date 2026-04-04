import { Link } from 'react-router-dom';

const ChatListPage = () => {
  return (
    <div>
      <h1>채팅 목록</h1>

      <Link to="/chat/1">채팅방 1로 이동</Link>
      <br />
      <Link to="/friends">친구목록으로 이동</Link>
    </div>
  );
};

export default ChatListPage;
