const MyProfileSection = () => {
  return (
    <section className="flex items-center justify-between px-4 py-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-[10.7px] bg-main-light" />
        <span className="Heading02SB">고다현</span>
      </div>

      <button className="flex items-center gap-1 rounded-[24px] border px-4 py-2">
        <span className="Body03M text-gray-80">내 파일 보관함</span>
      </button>
    </section>
  );
};

export default MyProfileSection;
