import rightSideIcon from '@/shared/assets/icons/my-profile/chevron-left.svg';

interface ProfileMenuItemsProps {
  icon: string;
  label: string;
}

const ProfileMenuItem = ({icon, label}: ProfileMenuItemsProps) => {
  return (
    <button className="flex items-center justify-between px-4 py-4 w-full">
      <div className="flex items-center gap-3">
        <img src={icon} alt={label} className="h-[17.97px] w-[18.85px]" />
        <span className="Body01R text-gray-90">{label}</span>
      </div>

      <img src={rightSideIcon} alt="" className="h-7 w-7" />
    </button>
  );
};

export default ProfileMenuItem;
