import MobileLayout from "@/layouts/MobileLayout";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import ProfileBgPng from "@/assets/images/ProfileBg_1.png";
import ProfileImagePng from "@/assets/images/ProfileImage_3.png";
import ChevronLeftIconSvg from "@/assets/icons/ic_Chevron_Left.svg";
import EditIconSvg from "@/assets/icons/ic_Edit.svg";
import KakaoStoryIconSvg from "@/assets/icons/ic_KakaoStory.svg";

type MyProfilePageProps = {
  onBack?: () => void;
};

function GlassIconButton({
  label,
  iconSrc,
}: {
  label: string;
  iconSrc: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center rounded-[100px] border border-chat-white bg-white/60 p-[8px] backdrop-blur-[4px]"
    >
      <img src={iconSrc} alt="" className="svg-icon h-[24px] w-[24px]" />
    </button>
  );
}

export default function MyProfilePage({ onBack }: MyProfilePageProps) {
  return (
    <MobileLayout>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-chat-gray-100">
        <img
          src={ProfileBgPng}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative z-10">
          <StatusBar backgroundColor="transparent" />

          <header className="flex items-center justify-between self-stretch p-[16px]">
            <button
              type="button"
              aria-label="뒤로가기"
              onClick={onBack}
              className="flex items-center rounded-[100px] border border-chat-white bg-white/60 p-[8px] backdrop-blur-[4px]"
            >
              <img
                src={ChevronLeftIconSvg}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </button>

            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                className="flex items-center justify-center gap-[4px] rounded-[100px] border border-chat-white bg-white/60 py-[8px] pr-[12px] pl-[12px] backdrop-blur-[4px]"
              >
                <span className="flex h-[20px] w-[20px] items-center justify-center px-[3px] pt-[2.58px] pb-[0.42px]">
                  <img
                    src={KakaoStoryIconSvg}
                    alt=""
                    className="svg-icon h-[17px] w-[14px]"
                  />
                </span>
                <span
                  className="text-center font-kakao-small text-[14px] leading-[160%] font-bold tracking-[-0.56px] text-chat-gray-600"
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  카카오스토리
                </span>
              </button>
              <GlassIconButton label="프로필 편집" iconSrc={EditIconSvg} />
            </div>
          </header>
        </div>

        <section className="relative z-10 mt-auto flex w-full flex-col items-start gap-[8px] rounded-t-[40px] bg-chat-white">
          <div className="flex h-[204px] w-[343px] flex-col items-center justify-center gap-[16px] self-center p-[24px]">
            <img
              src={ProfileImagePng}
              alt=""
              className="h-[64px] w-[64px] shrink-0 rounded-[16px] object-cover"
            />

            <div className="flex flex-col items-center gap-[4px] self-stretch">
              <h1
                className="text-center font-kakao-big text-[20px] leading-[140%] font-bold tracking-[-0.8px] text-chat-black"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                신짱구
              </h1>
              <p
                className="line-clamp-2 max-h-[44px] self-stretch overflow-hidden text-center font-kakao-small text-[14px] leading-[160%] font-bold tracking-[-0.56px] text-ellipsis text-chat-gray-500"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                부리부리
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[10px] self-stretch px-[16px]">
            <button
              type="button"
              className="flex items-center justify-center gap-[10px] self-stretch rounded-[8px] bg-chat-yellow-200 py-[12px]"
            >
              <span
                className="font-kakao-small text-[16px] leading-[160%] font-bold tracking-[-0.64px] text-chat-brown"
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                나와의 채팅하기
              </span>
            </button>
          </div>

          <div className="flex h-[34px] w-full items-center justify-center pt-[21px] pb-[8px]">
            <div className="hidden h-[5px] w-[134px] rounded-[100px] bg-chat-home-indicator md:block" />
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
