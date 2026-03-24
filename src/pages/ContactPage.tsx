import PlusIcon from "@/assets/icons/plus.svg?react";
import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";

const ContactPage = () => {
  const { scrolled, handleScroll } = useScrolled();

  return (
    <div className="flex h-full flex-col">
      <Header text="연락처" rightIcon={<PlusIcon />} scrolled={scrolled} />
      <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        {/* 페이지 내용 */}
      </div>
    </div>
  );
};

export default ContactPage;
