import PlusIcon from "@/assets/icons/plus.svg?react";
import Header from "@/components/Common/Header";

const ContactPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header text="연락처" rightIcon={<PlusIcon />} />
      <div className="flex-1 overflow-y-auto">{/* 페이지 내용 */}</div>
    </div>
  );
};

export default ContactPage;
