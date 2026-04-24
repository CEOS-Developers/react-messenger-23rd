import backChatList from "../../assets/chat-page/back-chat-list.svg";
import btnCall from "../../assets/chat-page/btn-call.svg";
import btnVideoCall from "../../assets/chat-page/btn-video-call.svg";
import profile from "../../assets/chat-page/profile.svg";
import changeProfile from "../../assets/chat-page/change-profile.svg";
import { useNavigate } from "react-router-dom";

type AppBarChatRoomProps = {
  headerId: string;
  headerName: string;
};

function AppBarChatRoom({ headerId, headerName }: AppBarChatRoomProps) {
  const navigate = useNavigate();
  return (
    <div className="box-border flex w-[var(--screen-width)] items-center justify-between border-b border-b-[var(--color-grey-300)] bg-[var(--color-grey-50)] pt-[var(--space-6)] pr-[var(--space-12)] pb-[var(--space-22)] pl-[var(--space-12)]">
      <section className="flex items-center gap-[var(--space-12)]">
        <button
          onClick={() => navigate("/")}
          className="flex size-[var(--size-32)] items-center justify-center p-[var(--space-4)]"
        >
          <img src={backChatList} alt="backChatList" />
        </button>
        <button className="flex items-center gap-[var(--space-7)] text-left">
          <img
            src={profile}
            alt="profile"
            className="h-[var(--size-32)] w-[var(--size-32)]"
          />

          <section className="flex h-[var(--size-34)] w-[var(--width-text-meta)] flex-col items-start">
            <div className="flex items-center">
              <p className="text-[var(--color-text-primary)] text-[var(--text-xs)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)]">
                {headerId}
              </p>
              <img
                src={changeProfile}
                alt="changeProfile"
                className="aspect-square h-[var(--size-12)] w-[var(--size-12)]"
              />
            </div>
            <p className="flex-1 self-stretch text-[var(--color-grey-600)] text-[var(--text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-tight)]">
              {headerName}
            </p>
          </section>
        </button>
      </section>
      <section className="flex items-center gap-[var(--space-12)]">
        <button className="flex size-[var(--size-32)] items-center justify-center p-[var(--space-4)]">
          <img src={btnCall} alt="btnCall" />
        </button>
        <button className="flex size-[var(--size-32)] items-center justify-center p-[var(--space-4)]">
          <img src={btnVideoCall} alt="btnVideoCall" />
        </button>
      </section>
    </div>
  );
}

export default AppBarChatRoom;
