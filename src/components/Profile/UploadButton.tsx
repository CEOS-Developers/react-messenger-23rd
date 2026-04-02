import CameraIcon from "@/assets/icons/camera.svg?react";

interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <button
      className="bg-gradation shadow-button rounded-100 flex w-31.25 cursor-pointer flex-row items-center gap-1 px-4 py-1.75"
      onClick={onClick}
    >
      <CameraIcon className="text-white" />
      <span className="font-body-4 text-center text-white">게시물 추가</span>
    </button>
  );
};

export default UploadButton;
