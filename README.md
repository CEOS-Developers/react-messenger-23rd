# **서론**

안녕하세요 😻
23기 프론트엔드 운영진 원채영입니다.

이번 주에는 투두리스트를 넘어, 새로운 프로젝트인 **Messenger** 구현을 진행합니다.

이번 과제는 디자이너와 협업하여 진행되는 프로젝트로,
디자인 파트에서 리디자인한 메신저 화면을 직접 구현해보는 경험을 하게 됩니다.

또한, 이번 주부터는 **TypeScript**와 **Tailwind CSS**를 필수로 적용하여 개발을 진행합니다.

프로젝트 규모가 커질수록 컴포넌트의 props도 점점 복잡해지는데요,
이때 TypeScript를 활용하면 props의 구조와 타입을 명확하게 관리할 수 있고,
자동완성을 통해 개발 생산성을 높일 수 있습니다.

아울러, 이번 과제에서는 **React Hooks**에 더욱 익숙해지는 것을 목표로 합니다.
특히 useState, useEffect, useRef를 중심으로 활용해보며, React에서 자주 사용되는 핵심 개념을 확실히 익혀보시길 바랍니다.

그럼 이번 과제도 파이팅입니다!! 🎉

# **과제**

## **목표**

- TypeScript를 사용해봅시다.
- useState로 컴포넌트의 상태를 관리합니다.
- useEffect와 useRef의 사용법을 이해합니다.
- Tailwind CSS의 사용법에 익숙해집니다.

## **기한**

- 2026년 3월 28일 토요일 23:59까지

## **Review Questions**

- 디자이너와 협업하며 전달받은 자료
  (피그마 링크, 캡처본, 커뮤니케이션 과정 등)

- JSX / JS / TSX / TS의 개념과 각각의 차이점, 사용 이유

- TypeScript를 사용하는 이유

- SSR과 CSR의 개념 및 차이점

## **필수 구현 기능**

- 피그마 **Dev Mode**를 통해 [결과화면](https://react-messenger-21th-kwondu.vercel.app/)을 구현합니다.
- 디자인 시스템을 구축합니다.
- tailwind CSS를 사용합니다.
- 메세지를 보내면 채팅방 하단으로 스크롤을 이동시킵니다.
- 메세지에 유저 정보(프로필 사진, 이름)를 표시합니다.
  - user와 message 데이터를 json 파일에 저장합니다.
- UI는 **반응형을 제외**하고 피그마파일을 따라서 진행합니다.

### **추가 구현 기능**

- 채팅방 상단의 프로필을 클릭하면 사용자를 변경할 수 있습니다.
- 더블 클릭 하면 감정표현을 추가합니다.
- 그 외 추가하고 싶은 기능이 있다면 마음껏 추가해 주세요!

<br/>

이번 과제는 다음 과제까지 이어지는 만큼, **확장성**을 충분히 고려해 주세요.
4주차 과제에서는 **유저 및 기능 추가**, **Routing 구현**이 진행될 예정입니다.

이를 대비해, [**zustand**](https://zustand-demo.pmnd.rs/)를 활용한 상태 관리도 미리 적용해보시는 것을 추천드립니다!

## **링크 및 참고자료**

- [React docs - Hook](https://ko.reactjs.org/docs/hooks-intro.html)
- [React의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks#1-usestate)
- [useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
- [타입스크립트 핸드북](https://joshua1988.github.io/ts/intro.html)
- [리액트 프로젝트에서 타입스크립트 사용하기 (시리즈)](https://velog.io/@velopert/series/react-with-typescript)
- [디자인 시스템 구축기](https://yozm.wishket.com/magazine/detail/1830/)
- [[영상] : 컴포넌트에 대한 이해](https://www.youtube.com/watch?v=21eiJc90ggo)
- [Tailwind CSS 장단점, 사용법](https://wonny.space/writing/dev/hello-tailwind-css)
- [ts 절대경로 설정하기](https://tesseractjh.tistory.com/232)

## **Project Tree**

```
ceos.week3.react-messenger-23rd
├─ react-messenger-23rd
│  ├─ .prettierrc
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ images
│  │     └─ Frame 73.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ App.tsx
│  │  │  ├─ main.tsx
│  │  │  └─ styles
│  │  │     └─ index.css
│  │  ├─ entities
│  │  │  ├─ message
│  │  │  │  ├─ model
│  │  │  │  │  └─ messages.json
│  │  │  │  └─ ui
│  │  │  └─ user
│  │  │     ├─ model
│  │  │     │  └─ users.json
│  │  │     └─ ui
│  │  ├─ features
│  │  │  ├─ createChat
│  │  │  ├─ readMessage
│  │  │  ├─ sendMessage
│  │  │  │  ├─ model
│  │  │  │  └─ ui
│  │  │  └─ uploadImage
│  │  ├─ pages
│  │  │  └─ chattingRoom
│  │  │     ├─ model
│  │  │     └─ ui
│  │  ├─ shared
│  │  │  ├─ assets
│  │  │  │  └─ icons
│  │  │  │     └─ chattingRoom
│  │  │  │        ├─ face-smile.svg
│  │  │  │        ├─ Frame 73.svg
│  │  │  │        ├─ hamburger(24_24).svg
│  │  │  │        ├─ microphone-01.svg
│  │  │  │        ├─ My_Text Box
│  │  │  │        │  └─ Back (32_32).svg
│  │  │  │        ├─ plus.svg
│  │  │  │        ├─ search(24_24).svg
│  │  │  │        └─ Status Bar
│  │  │  │           ├─ Elements
│  │  │  │           │  ├─ Battery.svg
│  │  │  │           │  ├─ Connection.svg
│  │  │  │           │  └─ Signal.svg
│  │  │  │           └─ Mic & Cam.svg
│  │  │  ├─ lib
│  │  │  ├─ Test.tsx
│  │  │  └─ ui
│  │  └─ widgets
│  │     └─ chattingRoom
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
└─ README.md

```
