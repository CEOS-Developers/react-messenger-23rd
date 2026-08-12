import questionIcon from '@/shared/assets/icons/friends/message-question-circle(24_24).svg';
import searchIcon from '@/shared/assets/icons/friends/search(24_24).svg';
import addFriendIcon from '@/shared/assets/icons/friends/user-plus(24_24).svg';

const FriendsHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <h1 className="Heading01SB text-gray-90">대화 상대</h1>

      <div className="flex items-center gap-4">
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <img src={searchIcon} alt="친구검색" className="h-6 w-6" />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <img src={addFriendIcon} alt="친구추가" className="h-6 w-6" />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <img src={questionIcon} alt="물음표" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default FriendsHeader;
