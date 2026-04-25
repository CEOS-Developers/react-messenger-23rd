# 4주차 과제: React Messenger v2

# 서론

안녕하세요 🤩 23기 프론트엔드 운영진 **원채영**입니다. 
이번 과제에서는 지난 과제를 기반으로, 친구 목록 및 채팅방 목록 등 **메신저의 핵심 기능을 확장**하게 됩니다.
점점 실제 서비스에 가까운 형태로 발전하는 단계인 만큼, 기능 구현뿐만 아니라 UI 일관성과 구조 설계까지 함께 고민해보시면 좋겠습니다.

이번 주 역시 디자이너와의 협업으로 진행됩니다.
디자이너분이 리디자인한 화면을 바탕으로, 피그마 **Dev Mode**를 적극 활용하여 UI를 구현해 주세요.

또한, 지난 주에 적용했던 TypeScript와 TailwindCSS를 기반으로 코드 구조를 **리팩토링**해보는 것도 추천드립니다.

특히 이번 과제의 핵심 목표는 **React Router**를 활용한 라우팅 구조 이해입니다.
**SPA**(Single Page Application)에서의 페이지 전환 방식을 이해하고, 자연스러운 사용자 경험을 구현해보세요.

그럼 이번 과제도 파이팅입니다! 🎉

# 과제

## 목표

- TypeScript를 적극적으로 활용하여 코드의 타입 안정성을 확보합니다.
- React Router를 사용해 페이지 간 라우팅을 구현하고, 동적 경로와 URL 파라미터를 이해합니다.
- useState와 useReducer를 사용하여 컴포넌트의 로컬 상태를 관리하고, 상태 관리 로직을 최적화합니다.
- Tailwind CSS로 스타일링하여 일관된 디자인 시스템을 구축합니다.

## 기한

- 2026년 4월 25일 토요일 23:59까지

## Review Questions

- React Router의 동적 라우팅(Dynamic Routing)이란 무엇이며, 언제 사용하나요?
- 네트워크 속도가 느린 환경에서 사용자 경험을 개선하기 위해 사용할 수 있는 UI/UX 디자인 전략과 기술적 최적화 방법은 무엇인가요?
- React에서 useState와 useReducer를 활용한 지역 상태 관리와 Context API 및 전역 상태 관리 라이브러리의 차이점을 설명하세요.

## 필수 구현 기능

- 피그마 **Dev Mode**를 통해, 매칭된 디자인 파트원의 UI를 구현합니다.
    - [🔗 예시 1](https://react-messenger-21th-kwondu.vercel.app/)
    - [🔗 예시 2](https://react-messenger-21th-nine.vercel.app/)
- 친구 목록 기능을 구현합니다.
- React Router를 활용하여 친구 목록, 채팅방 목록, 채팅방 등의 페이지를 각각 구성합니다.
- 채팅방 데이터를 로컬스토리지에 저장하여, 새로고침 시에도 데이터가 유지되도록 구현합니다.
- 메시지에 유저 정보(프로필 이미지, 이름)를 함께 표시합니다.
- user 및 message 데이터를 JSON 파일로 구성하여 관리합니다.
- UI는 반응형을 제외하고, 피그마 파일을 기준으로 구현합니다.

### 추가 구현 기능(선택 사항)

- 메세지 읽음/안읽음 표시 기능을 추가합니다.
- 채팅방 핀(Pin) 기능을 구현합니다.
- 채팅방에서 파일 및 이미지 전송이 가능하도록 합니다.
- 이외에도 추가하고 싶은 기능이 있다면 추가하셔도 좋습니다.🙂‍↕️

## 링크 및 참고자료

- [React docs - Hook](https://ko.react.dev/learn)
- [React의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks#1-usestate)
- [useEffect 완벽 가이드](https://overreacted.io/a-complete-guide-to-useeffect/)
- [코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
- [타입스크립트 핸드북](https://joshua1988.github.io/ts/intro.html)
- [리액트 프로젝트에서 타입스크립트 사용하기 (시리즈)](https://velog.io/@velopert/series/react-with-typescript)
- [디자인 시스템 구축기](https://yozm.wishket.com/magazine/detail/1830/)
- [[영상] : 컴포넌트에 대한 이해](https://www.youtube.com/watch?v=21eiJc90ggo)
- [Tailwind CSS 사용법](https://www.heropy.dev/p/E67ZHS)
- [ts 절대경로 설정하기](https://tesseractjh.tistory.com/232)

## **Project Tree**

```
ceos.week3.react-messenger-23rd
├─ react-messenger-23rd
│  ├─ .prettierrc
│  ├─ dist
│  │  ├─ assets
│  │  │  ├─ index-BZvjYWlK.css
│  │  │  └─ index-DuB9fP3j.js
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  ├─ images
│  │  │  ├─ Frame 73.svg
│  │  │  └─ user-02.svg
│  │  └─ index.html
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ images
│  │     ├─ Frame 73.svg
│  │     └─ user-02.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  └─ styles
│  │  │     └─ index.css
│  │  ├─ App.tsx
│  │  ├─ entities
│  │  │  ├─ chat-room
│  │  │  │  └─ model
│  │  │  │     ├─ chatRooms.json
│  │  │  │     └─ types.ts
│  │  │  ├─ message
│  │  │  │  ├─ model
│  │  │  │  │  ├─ messages.json
│  │  │  │  │  └─ types.ts
│  │  │  │  └─ ui
│  │  │  │     └─ MessageBubble.tsx
│  │  │  └─ user
│  │  │     └─ model
│  │  │        ├─ types.ts
│  │  │        └─ users.json
│  │  ├─ features
│  │  │  ├─ create-chat-room
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  ├─ send-message
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  └─ upload-image
│  │  │     ├─ model
│  │  │     └─ ui
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ chat-list
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  │     └─ ChatListPage.tsx
│  │  │  ├─ chat-room
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  │     └─ ChatRoomPage.tsx
│  │  │  ├─ friends
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  │     └─ FriendsPage.tsx
│  │  │  └─ my-profile
│  │  │     ├─ model
│  │  │     └─ ui
│  │  │        └─ MyProfilePage.tsx
│  │  ├─ shared
│  │  │  ├─ assets
│  │  │  │  └─ icons
│  │  │  │     ├─ chat-list
│  │  │  │     │  ├─ compass-03.svg
│  │  │  │     │  ├─ Icon.svg
│  │  │  │     │  ├─ new chatting(24_24).svg
│  │  │  │     │  ├─ search(20_20).svg
│  │  │  │     │  ├─ settings-02.svg
│  │  │  │     │  ├─ Toggle.svg
│  │  │  │     │  ├─ user-02.svg
│  │  │  │     │  ├─ user-circle.svg
│  │  │  │     │  └─ users-01.svg
│  │  │  │     ├─ chat-room
│  │  │  │     │  ├─ face-smile.svg
│  │  │  │     │  ├─ Frame 73.svg
│  │  │  │     │  ├─ hamburger(24_24).svg
│  │  │  │     │  ├─ microphone-01.svg
│  │  │  │     │  ├─ My_Text Box
│  │  │  │     │  │  └─ Back (32_32).svg
│  │  │  │     │  ├─ plus.svg
│  │  │  │     │  ├─ search(24_24).svg
│  │  │  │     │  └─ Status Bar
│  │  │  │     │     ├─ Elements
│  │  │  │     │     │  ├─ Battery.svg
│  │  │  │     │     │  ├─ Connection.svg
│  │  │  │     │     │  └─ Signal.svg
│  │  │  │     │     └─ Mic & Cam.svg
│  │  │  │     ├─ chattingRoom
│  │  │  │     │  ├─ arrow-narrow-up.svg
│  │  │  │     │  ├─ face-smile.svg
│  │  │  │     │  ├─ Frame 73.svg
│  │  │  │     │  ├─ hamburger(24_24).svg
│  │  │  │     │  ├─ microphone-01.svg
│  │  │  │     │  ├─ My_Text Box
│  │  │  │     │  │  └─ Back (32_32).svg
│  │  │  │     │  ├─ plus.svg
│  │  │  │     │  ├─ search(24_24).svg
│  │  │  │     │  └─ Status Bar
│  │  │  │     │     ├─ Elements
│  │  │  │     │     │  ├─ Battery.svg
│  │  │  │     │     │  ├─ Connection.svg
│  │  │  │     │     │  └─ Signal.svg
│  │  │  │     │     └─ Mic & Cam.svg
│  │  │  │     └─ friends
│  │  │  │        ├─ folder-download.svg
│  │  │  │        ├─ message-question-circle(24_24).svg
│  │  │  │        ├─ notification-message (1).svg
│  │  │  │        ├─ notification-message.svg
│  │  │  │        ├─ plus.svg
│  │  │  │        ├─ rightside(24_24).svg
│  │  │  │        ├─ search(24_24).svg
│  │  │  │        ├─ upside(24_24).svg
│  │  │  │        ├─ user-02.svg
│  │  │  │        └─ user-plus(24_24).svg
│  │  │  ├─ constants
│  │  │  ├─ lib
│  │  │  └─ ui
│  │  │     ├─ MobileLayout.tsx
│  │  │     └─ StatusBar.tsx
│  │  └─ widgets
│  │     ├─ chat-list
│  │     │  ├─ model
│  │     │  └─ ui
│  │     │     ├─ BottomTabBar.tsx
│  │     │     ├─ ChatListHeader.tsx
│  │     │     ├─ ChatListSearch.tsx
│  │     │     ├─ ChatRoomItem.tsx
│  │     │     └─ ChatRoomList.tsx
│  │     ├─ chat-room
│  │     │  ├─ model
│  │     │  └─ ui
│  │     │     ├─ ChatRoomHeader.tsx
│  │     │     ├─ DateDivider.tsx
│  │     │     ├─ MessageInputBar.tsx
│  │     │     └─ MessageList.tsx
│  │     └─ friends
│  │        ├─ model
│  │        └─ ui
│  │           ├─ FriendItem.tsx
│  │           ├─ FriendsHeader.tsx
│  │           ├─ FriendsList.tsx
│  │           ├─ MyProfileSection.tsx
│  │           └─ TagSection.tsx
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
└─ README.md

```
