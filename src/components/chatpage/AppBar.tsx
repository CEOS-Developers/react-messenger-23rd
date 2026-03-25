import backChatList from "../../img/chatpage/backChatList.svg";
import btnCall from "../../img/chatpage/btnCall.svg";
import btnVideoCall from "../../img/chatpage/btnVideoCall.svg";

function AppBar() {
  return (
    <div>
      <button type="button">
        <img src={backChatList} alt="backChatList" />
      </button>
      <button></button>
      <button>
        <img src={btnCall} alt="btnCall" />
      </button>
      <button>
        <img src={btnVideoCall} alt="btnVideoCall" />
      </button>
    </div>
  );
}

export default AppBar;
