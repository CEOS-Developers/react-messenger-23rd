import copyIcon from '@/shared/assets/icons/my-profile/copy(20_20).svg';

const ProfileIdSection = () => {
  return (
    <section className="px-4 py-2 mb-8">
      <span className="text-sm font-medium leading-5 text-gray-50">ID</span>

      <div className="flex items-center justify-between">
        <span className="Heading02R text-black">wxid_net0sc3hdxum12</span>

        <button>
          <img src={copyIcon} alt="복사" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default ProfileIdSection;
