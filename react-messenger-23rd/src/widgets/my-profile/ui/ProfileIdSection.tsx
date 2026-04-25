import copyIcon from '@/shared/assets/icons/my-profile/copy(20_20).svg';

interface ProfileIdSectionProps {
  onCopy: () => void;
}

const MY_ID = 'wxid_net0sc3hdxum12';

const ProfileIdSection = ({ onCopy }: ProfileIdSectionProps) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(MY_ID); 
    onCopy();
  };

  return (
    <section className="px-4 py-2 mb-8">
      <span className="text-sm font-medium leading-5 text-gray-50">ID</span>

      <div className="flex items-center justify-between">
        <span className="Heading02R text-black">{MY_ID}</span>

        <button type="button" onClick={handleCopy}>
          <img src={copyIcon} alt="복사" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default ProfileIdSection;
