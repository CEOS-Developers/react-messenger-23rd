import { cn } from "@/utils/cn";
import { getFirstName } from "@/utils/getName";

interface ProfileProps {
  name: string;
  profileColor: string;
  type?: "chatroom" | "navibar";
}

const VARIANTS = {
  chatroom: {
    container: "flex items-center justify-center shrink-0 text-white rounded-15 size-7.5",
    text: "font-suit text-[10.909px] font-semibold leading-[150%] tracking-[-0.218px]",
  },
  navibar: {
    container: "flex items-center justify-center shrink-0 text-white size-5 rounded-full",
    text: "font-suit text-[7px] font-bold leading-[140%] tracking-[-0.21px]",
  },
};

const Profile = ({ name, profileColor, type = "navibar" }: ProfileProps) => {
  const { container, text } = VARIANTS[type];
  return (
    <div className={cn(container, profileColor)}>
      <span className={text}>{getFirstName(name)}</span>
    </div>
  );
};

export default Profile;
