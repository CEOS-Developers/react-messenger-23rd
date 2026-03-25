import backChatList from "../../img/chatpage/backChatList.svg";
import btnCall from "../../img/chatpage/btnCall.svg";
import btnVideoCall from "../../img/chatpage/btnVideoCall.svg";
import profile from "../../img/chatpage/profile.svg";
import changeProfile from "../../img/chatpage/changeProfile.svg";

function AppBar() {
  return (
    <div className="AppBar">
      <section className="appBarSection">
        <button className="btnAppBar">
          <img src={backChatList} alt="backChatList" />
        </button>
        <button className="flex items-center gap-[7px] text-left">
          <img src={profile} alt="profile" className="w-[32px] h-[32px]" />

          <section className="flex w-[122px] h-[34px] flex-col items-start">
            <div className="flex items-center">
              <p className="text-[#0A1014] text-[12px] font-semibold leading-[140%]">
                idSpace
              </p>
              <img
                src={changeProfile}
                alt="changeProfile"
                className="w-[12px] h-[12px] aspect-square"
              />
            </div>
            <p className="flex-1 self-stretch text-[#68717B] text-[12px] font-normal leading-[140%]">
              nameSpace
            </p>
          </section>
        </button>
      </section>
      <section className="appBarSection">
        <button className="btnAppBar">
          <img src={btnCall} alt="btnCall" />
        </button>
        <button className="btnAppBar">
          <img src={btnVideoCall} alt="btnVideoCall" />
        </button>
      </section>
    </div>
  );
}

export default AppBar;
