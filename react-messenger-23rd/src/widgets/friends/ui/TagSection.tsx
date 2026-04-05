const TagSection = () => {
  return (
    <section className="px-4">
      <div className="border-t border-gray-20" />

      <div className="flex items-center justify-between py-3">
        <span className="Body03R text-gray-70">태그</span>
        <button>^</button>
      </div>

      <div className="flex flex-col gap-1 pb-5">
        <div className="flex items-center justify-between py-2">
          <span className="Body01M text-gray-80">우강고토주</span>
          <span className="Body03R text-gray-70">5</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="Body01M text-gray-80">홍익시디</span>
          <span className="Body03R text-gray-70">24</span>
        </div>
      </div>
    </section>
  );
};

export default TagSection;
