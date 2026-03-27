import { PROFILE_VARIANTS } from "@/constants/profile";
import { cn } from "@/utils/cn";
import { getFirstName } from "@/utils/getName";

interface ProfileProps {
  name: string;
  profileColor: string;
  type?: "chatroom" | "navibar";
}

const Profile = ({ name, profileColor, type = "navibar" }: ProfileProps) => {
  const { container, text } = PROFILE_VARIANTS[type];
  return (
    <div className={cn(container, profileColor)}>
      <span className={text}>{getFirstName(name)}</span>
    </div>
  );
};

export default Profile;
