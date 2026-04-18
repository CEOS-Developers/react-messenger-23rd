import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function NoticeBar() {
  const navigate = useNavigate();

  return (
    <div className="px-3 py-2 w-full">
      <div className="flex items-center justify-between bg-gray70 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            src="/images/icons/Flag.png"
            alt="공지"
            className="w-5 h-5 object-contain text-main2"
          />

          <span className="text-white font-body-01">공지</span>
        </div>

        <button
          className="text-white text-2xl"
          onClick={() => navigate("/notice-page")}
        >
          <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
}
