import add_circle from '../src/icons/icon_add_circle.svg';
import setting from '../src/icons/icon_setting.svg';
import { ChatCategory } from '../src/components/chat/ChatCategory';
import { SearchBar } from '../src/components/utils/SearchBar';
import { NavBar } from '../src/components/utils/Navbar';

export const ChatListPage = () => {
  return (
    <div className="flex flex-col px-4 py-1.25">
      {/* 최상단 바 */}
      <div className="flex w-full justify-between items-center h-11">
        <p className="text-title">채팅</p>
        <div className="flex flex-row gap-3">
          <img src={add_circle} alt="" className="w-6 h-6" />
          <img src={setting} className="w-6 h-6" />
        </div>
      </div>

      <SearchBar/>

      <ChatCategory/>

      <NavBar/>
    </div>
  );
};
