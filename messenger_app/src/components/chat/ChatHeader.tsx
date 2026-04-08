import arrow_right from '../../icons/icon_arrow_right.svg';
import video from '../../icons/icon_video.svg';
import call from '../../icons/icon_callOff.svg';
import profile from '../../assets/profile_yelin.jpg';
import { useNavigate } from 'react-router-dom';

const CHAT_COUNTS = 29;
const NAME = '김예린';

export const ChatHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 상단바(헤더) */}
      <header className="w-full px-4 h-12 flex flex-row shrink-0 items-center justify-between bg-Ivory">
        <div className="flex w-12 h-7 items-center justify-between">
          <img src={arrow_right} alt="" onClick={() => navigate('/chat')} />
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
    </div>
  );
};
