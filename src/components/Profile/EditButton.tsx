import EditIcon from "@/assets/icons/icon_edit_regular.svg?react";
import ProfileIcon from "@/assets/icons/icon_profile_regular.svg?react";

type EditButtonType = "profile" | "info";

interface EditButtonProps {
  type: EditButtonType;
  onClick?: () => void;
}

const BUTTON_CONFIG: Record<EditButtonType, { icon: React.ReactNode; label: string }> = {
  profile: { icon: <ProfileIcon />, label: "프로필 수정" },
  info: { icon: <EditIcon />, label: "내 정보 수정" },
};

const EditButton = ({ type, onClick }: EditButtonProps) => {
  const { icon, label } = BUTTON_CONFIG[type];

  return (
    <button
      className="rounded-60 flex h-10.5 w-39 cursor-pointer items-center justify-center gap-2 bg-gray-100 px-3 py-2.5 text-gray-700"
      onClick={onClick}
    >
      <span className="size-6 text-gray-500">{icon}</span>
      <span className="font-body-5 text-gray-500">{label}</span>
    </button>
  );
};

export default EditButton;
