interface ChatProfileProps {
  name: string;
}

const ChatProfile = ({ name }: ChatProfileProps) => {
  return (
    <div className="rounded-15 bg-profile-5 flex size-7.5 shrink-0 items-center justify-center">
      <span className="font-suit text-[10.909px] leading-[150%] font-semibold tracking-[-0.218px] text-white">
        {name}
      </span>
    </div>
  );
};

export default ChatProfile;
