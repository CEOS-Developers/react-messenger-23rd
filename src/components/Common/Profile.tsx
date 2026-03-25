interface ProfileProps {
  name: string;
  type?: "chatroom" | "navibar";
}

const BASE = "flex items-center justify-center shrink-0 text-white";

const VARIANTS = {
  chatroom: {
    container: `${BASE} rounded-15 size-7.5 bg-profile-5`,
    text: "font-suit text-[10.909px] font-semibold leading-[150%] tracking-[-0.218px]",
  },
  navibar: {
    container: `${BASE} size-5 rounded-full bg-profile-6`,
    text: "font-suit text-[7px] font-bold leading-[140%] tracking-[-0.21px]",
  },
};

const Profile = ({ name, type = "navibar" }: ProfileProps) => {
  const { container, text } = VARIANTS[type];
  return (
    <div className={container}>
      <span className={text}>{name}</span>
    </div>
  );
};

export default Profile;
