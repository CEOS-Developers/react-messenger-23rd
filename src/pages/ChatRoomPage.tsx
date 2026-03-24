import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Header from "@/components/Common/Header";

const ChatRoomPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header leftIcon={<BackIcon />} text="김예지" rightIcon={<CallIcon />} />
      <div className="flex-1 overflow-y-auto">{/* 페이지 내용 */}</div>
    </div>
  );
};

export default ChatRoomPage;
