import QrIcon from "@/assets/icons/qr.svg?react";
import Header from "@/components/Common/Header";

const ProfilePage = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Header leftIcon={<QrIcon />} />
      <main>{/* 페이지 내용 */}</main>
    </div>
  );
};

export default ProfilePage;
