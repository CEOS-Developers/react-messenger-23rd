import QrIcon from "@/assets/icons/qr.svg?react";
import Header from "@/components/Common/Header";

const ProfilePage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header leftIcon={<QrIcon />} />
      <div className="flex-1 overflow-y-auto">{/* 페이지 내용 */}</div>
    </div>
  );
};

export default ProfilePage;
