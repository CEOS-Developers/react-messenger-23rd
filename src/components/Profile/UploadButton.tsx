import CameraIcon from "@/assets/icons/camera.svg?react";

const UploadButton = () => {
  return (
    <button className="bg-gradation shadow-button rounded-100 flex w-fit cursor-pointer flex-row items-center gap-1 px-4 py-1.75">
      <CameraIcon className="text-white" />
      <span className="font-body-4 text-white">게시물 추가</span>
    </button>
  );
};

export default UploadButton;
