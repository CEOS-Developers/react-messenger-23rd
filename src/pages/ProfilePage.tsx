import QrIcon from "@/assets/icons/qr.svg?react";
import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";

const ProfilePage = () => {
  const { scrolled, handleScroll } = useScrolled();

  return (
    <div className="flex h-full flex-col">
      <Header leftIcon={<QrIcon />} scrolled={scrolled} />
      <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        {/* 페이지 내용 */}
      </div>
    </div>
  );
};

export default ProfilePage;
