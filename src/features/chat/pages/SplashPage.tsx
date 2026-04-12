import MobileLayout from "@/layouts/MobileLayout";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import KakaoTalkIconSvg from "@/assets/icons/ic_KakaoTalk.svg";

export default function SplashPage() {
  return (
    <MobileLayout>
      <div className="flex h-full w-full flex-col bg-chat-yellow-200">
        <StatusBar backgroundColor="yellow" />

        <main className="flex min-h-0 flex-1 items-center justify-center">
          <img
            src={KakaoTalkIconSvg}
            alt="KakaoTalk"
            className="h-[102px] w-[102px]"
          />
        </main>

        <div className="flex h-[34px] w-full items-center justify-center bg-chat-yellow-200 pt-[21px] pb-[8px]">
          <div className="hidden h-[5px] w-[134px] rounded-[100px] bg-chat-home-indicator md:block" />
        </div>
      </div>
    </MobileLayout>
  );
}
