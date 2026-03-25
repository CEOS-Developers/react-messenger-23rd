import arrow_left from '../src/assets/icon/arrow_left.svg';
import video from '../src/assets/icon/video.svg';
import call from '../src/assets/icon/call.svg';
import add from '../src/assets/icon/add.svg';
import shapes from '../src/assets/icon/shapes.svg';
import profile from '../src/assets/profile.jpg';
import { useChatStore } from '../src/store/useChatStore';

const CHAT_COUNTS = 29;
const NAME = '김예린';

export const ChatPage = () => {
  return (
    <div className="w-full min-h-screen">
      {/* 상단바(헤더) */}
      <header className="w-full px-4 h-12 flex flex-row items-center justify-between bg-Ivory">
        <div className="flex w-12 h-7 items-center justify-between">
          <img src={arrow_left} alt="" />
          <div className="text-body-02">{CHAT_COUNTS}</div>
        </div>

        <img
          src={profile}
          alt=""
          className="w-8 h-8 rounded-full overflow-auto ml-5 mr-2"
        />
        <p className="text-body-01 mr-auto">{NAME}</p>

        <img src={video} alt="" className="w-6 h-6 gap-3" />
        <img src={call} alt="" className="w-6 h-6 ml-3" />
      </header>

      {/* 메인 채팅창 */}
      <div className="bg-white px-4"></div>

      {/* 하단 메뉴 및 채팅 입력창 */}
      <div className="absolute w-full h-20 px-4 py-3 bottom-0 bg-Ivory">
        <div className="w-full h-full flex items-start mb-5">
          <img src={add} alt="" className="w-9 h-9 mr-2" />
          <div className="w-full h-11">
            <div className="flex justify-between bg-white w-full h-full rounded-[13.5px] px-4 py-2.5">
                <input type="text" placeholder='메시지 입력' className='outline-none' />
                <img src={shapes} alt="" className='w-7 h-7'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
