import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Props {
  name: string;
  onNameClick?: () => void;
}

export default function ChatHeader({ name, onNameClick }: Props) {
  const navigate = useNavigate();

  return (
    <header className="flex h-11 w-full px-2.5 py-4 items-center text-white">
      <div className="flex flex-1 justify-start">
        <button onClick={() => navigate("/chatlist")} className="">
          <IoIosArrowBack className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-1 justify-center">
        <button onClick={onNameClick}>
          <h1 className="text-body-01">{name}</h1>
        </button>
      </div>
      <div className="flex flex-1 justify-end">
        <button>
          <HiOutlineDotsHorizontal className="w-11 h-6" />
        </button>
      </div>
    </header>
  );
}
