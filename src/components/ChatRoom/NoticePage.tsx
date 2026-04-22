import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NoticePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* 상단 바 */}
      <div className="flex h-11 w-full px-2.5 py-4 justify-between items-center text-white">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        <span className="text-body-01">그룹 알림</span>
        <button>
          <span className="text-body-01">편집</span>
        </button>
      </div>
      {/* 프로필 */}
      <div className="flex text-white pt-2 pb-4 px-4">
        <img
          src="/images/profiles/leewoorim.png"
          className="w-11 h-11 shrink-0 rounded-md mr-3"
          alt="profileImage"
        />
        <div className="flex flex-col">
          <span className="text-body-01">이우림</span>
          <div className="flex text-caption-01 text-gray30 gap-2">
            <p>2026. 2. 20</p>
            <p>20:00</p>
          </div>
        </div>
      </div>
      <hr className="text-gray60" />

      {/* 내용 */}
      <div className="flex flex-col text-white text-body-01 pt-5 pb-2.5 px-4">
        <span>공지</span>
        <span>오후 2시 신촌역!!</span>
      </div>
    </>
  );
}
