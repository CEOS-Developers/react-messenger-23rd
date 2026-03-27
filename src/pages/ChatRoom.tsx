// const currentUserId == "user-1"; 이런식으로 현재 유저가 누구인지 설정 필요

// // 메시지 목록을 뿌려줄 때
// {messages.map((msg) => {
//   // 메시지를 보낸 사람(senderId)이 지금 나(currentUserId)와 같은지 확인!
//   const isMe = msg.senderId === currentUserId;

//   return isMe ? (
//     <SentBubble key={msg.id} message={msg} />
//   ) : (
//     <ReceivedBubble key={msg.id} message={msg} />
//   );
// })}
