# Telegram <img width="100" alt="logo" src="public/favicon.svg" align="left" />

<h3>[CEOS 23rd Week3~4] - React Messenger</h3>

<br/>

> 디자인팀과 UX를 함께 고민하고, 컴포넌트 설계부터 구현까지 — 실제 메신저의 데이터 흐름을 React로 재현한 **[Telegram Redesign](https://react-messenger-23rd.vercel.app/)** 프로젝트입니다.
> 발신자 기반 메시지 그루핑, 발화자 시점 전환, 채팅방별 독립 상태 관리 등 인터랙션의 디테일에 집중했습니다.

<br />

<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/af20ea49-082f-4345-8938-546dbfcba3ee" />
<img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/4bfcc5d4-7705-4b23-ae2d-7e9f601adc13" />
<img width="1920" height="1080" alt="디자인 시스템" src="https://github.com/user-attachments/assets/0a23114d-264f-4a63-882c-06d0742e7ded" />
<img width="1920" height="1080" alt="컴포넌트" src="https://github.com/user-attachments/assets/00d1ae37-1c4f-4e56-a714-d5f0d70caead" />
<img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/0471e101-507a-4686-bac1-3e04a692f369" />
<img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/fd8310c3-7ba3-4c51-b824-b81e42fe05c6" />

## ✨ 주요 기능

### 🛫 스플래시

- Framer Motion을 활용한 비행기 이륙 애니메이션 구현
- `onUpdate` 콜백으로 비행기의 x 좌표를 추적하여, 화면 밖으로 벗어나는 시점에 `/chat`으로 자동 전환
- `useRef`(`hasNavigated`)로 애니메이션 도중 `navigate` 중복 호출 방지

### 💬 채팅 리스트

- 채팅방 참여자 수(1~4명)에 따라 프로필 이미지 레이아웃 자동 변경 (단일 원형 → 대각선 2개 → 상단 1+하단 2 → 2×2 격자)
- 채팅방 목록 렌더링에 필요한 프로필 · 미읽음 수 · 마지막 메시지를 `useMemo`로 한 번에 집계 — 상태 변경 시에만 재계산
- 각 항목에 최신 메시지(이미지 전송 시 "사진을 보냈습니다.") · 타임스탬프 · 읽음 체크 · 고정 여부 렌더링
- 고정 채팅방 항상 최상단 고정, 나머지는 마지막 메시지 기준 최신순 자동 정렬
- 참여자 이름 기반 실시간 채팅방 검색 (`useMemo`)
- 네비바 '대화' 아이콘에 전체 미읽음 메시지 수 표시 (99개 이상이면 `99+`)
- 스크롤 감지 시 헤더에 돋보기 아이콘 노출, 클릭하면 최상단으로 부드럽게 이동
- 아이템 클릭 시 해당 채팅방으로 동적 라우팅

### ☎️ 연락처

- 유저별 최근 접속 시각을 모듈 로드 시 전체 메시지 단일 순회로 미리 계산 — 컴포넌트 리렌더 시 재계산 없음
- 정렬 기준별 배열도 모듈 레벨에서 한 번만 정렬해 두고 재사용
- 마지막 접속 순(기본) / 이름 순 정렬 토글
- 이름 순 정렬 시 성(姓) 기준 인덱스 섹션 헤더 렌더링 — 검색 결과에 맞게 인덱스 헤더를 재계산하여 항상 정확하게 표시
- 검색 중 정렬 토글 버튼 및 '내 프로필' 섹션 자동 숨김
- 이름 기반 실시간 사용자 검색
- 내 프로필 항목 클릭 시 프로필 페이지로 이동
- 채팅 리스트와 동일한 스크롤 감지 기반 돋보기 아이콘 UX

### 📩 채팅방

- 동일 발신자가 같은 날짜에 연속으로 보낸 메시지를 하나의 그룹으로 묶어 렌더링
- 메시지 배열을 단일 순회하여 말풍선 꼭짓점 제어와 읽음 상태 표시 위치를 동시에 계산 — `useMemo`로 채팅방 상태 변경 시에만 재계산
- 그룹 첫 메시지에만 발신자 프로필 아바타와 이름 표시, 이후 연속 메시지에는 동일 크기의 빈 공간으로 정렬 유지
- 같은 시간대 마지막 메시지 옆에만 읽음 체크 · 시각 표시 (회색 체크 = 미읽음 / 초록 체크 = 읽음)
- 다인 채팅방에서는 같은 발신자끼리 간격을 좁혀 그룹감을 강조, 발신자가 바뀌는 경우 충분한 여백으로 시각적 분리
- 날짜 구분선 렌더링 및 입력창 높이 자동 확장 (최대 높이 초과 시 스크롤), 높이 변경량만큼 스크롤 위치 보정
- Enter로 메시지 전송, Shift+Enter로 줄바꿈, 텍스트 입력 유무에 따라 전송 / 음성 아이콘 동적 전환
- 텍스트 메시지 전송 및 클립 아이콘을 통한 이미지 파일 첨부 전송
- 텍스트 말풍선과 이미지 버블이 동일한 꼭짓점 제어 로직 공유 — 시간 그룹 첫 메시지 여부에 따라 꼭짓점 자동 제어
- 헤더 이름 클릭 시 채팅방 참여자 전원을 순서대로 순환하며 발화자 시점 전환 — 전환 시 헤더 제목이 상대방 이름으로 즉시 변경되고 상대방 메시지 일괄 읽음 처리
- 채팅방 진입 시 미읽음 메시지 일괄 읽음 처리 및 최하단 자동 스크롤

### 👤 프로필

- 내 프로필 컬러 아바타 · 이름 · 전화번호 렌더링
- '게시물' / '보관된 게시물' 탭 전환으로 사진 컬렉션 뷰 구현
- 로컬 이미지 업로드 시 `uploadedImages` 배열 앞에 삽입되어 목록 최상단에 즉시 반영
- 사진 카드 클릭으로 즐겨찾기(☆) 상태 토글

### ⚙️ 설정

- `react-spinners`의 `ScaleLoader`를 서비스 primary 색상으로 적용해 준비 중 상태 안내

### 🔧 공통

- `React.memo`를 `Message`, `ProfileImage`, `ChatListItem`, `ContactListItem`, `TextField`, `ChatTime`, `MessageDate`, `ToggleTap` 총 8개 컴포넌트에 적용해 불필요한 리렌더링 방지
- 채팅방·채팅 리스트·프로필·네비바 등 여러 곳에서 공통으로 사용되는 원형 프로필 컴포넌트의 스타일을 `PROFILE_VARIANTS` 상수에 사용처별 variant(`chatroom`, `navibar`, `chatlist_1/2/3`, `profile_big`)로 정의해 재사용 — 이미지 파일 없이 색상과 이름 첫 글자 기반으로 직접 구현
- `zustand persist` + 커스텀 localStorage 어댑터로 채팅방 ID별 스토리지 키 분리 저장 — 전체 상태를 단일 키에 직렬화하는 방식의 비효율 개선
- iOS 네이티브 앱 수준의 UI/UX (상태바, 홈 인디케이터, 하단 내비게이션) 정밀 구현
- 정의되지 않은 경로 접근 시 `PublicLayout`을 유지한 채로 404 페이지 렌더링 — react-router-dom의 `path: "*"` catch-all 라우트 활용

<table>
  <tr>
    <td align="center"><b>스플래시</b></td>
    <td align="center"><b>채팅 리스트</b></td>
    <td align="center"><b>연락처</b></td>
  </tr>
  <tr>
    <td><img width="200" alt="스플래시" src="https://github.com/user-attachments/assets/e676eda9-1deb-4296-99ac-6bded2e85d50" /></td>
    <td><img width="200" alt="채팅 리스트" src="https://github.com/user-attachments/assets/03eeaa9a-b910-4bae-89e7-61be0d5d3021" /></td>
    <td><img width="200" alt="연락처" src="https://github.com/user-attachments/assets/66a448ac-5a2e-45bf-a68a-b84a7d04baa2" /></td>
  </tr>
  <tr>
    <td align="center"><b>채팅방</b></td>
    <td align="center"><b>프로필</b></td>
    <td align="center"><b>설정</b></td>
  </tr>
  <tr>
    <td><img width="200" alt="채팅방" src="https://github.com/user-attachments/assets/f7a83af6-ea24-4479-88ca-d69009335624" /></td>
    <td><img width="200" alt="프로필" src="https://github.com/user-attachments/assets/7f3b28cc-32f7-4db7-bc5e-5d52a071b71a" /></td>
    <td><img width="200" alt="설정" src="https://github.com/user-attachments/assets/f3df5776-474c-4d8b-84cc-0d110885c96b" /></td>
  </tr>
</table>

## 📁 폴더 구조

```text
src/
├─ assets/
│  ├─ icons/              # SVG 아이콘
│  └─ images/             # 이미지 파일
├─ components/
│  ├─ ChatList/           # 채팅 리스트 컴포넌트
│  │  ├─ ChatListItem.tsx
│  │  ├─ ChatTime.tsx
│  │  ├─ CreateChatButton.tsx
│  │  └─ ProfileImage.tsx
│  ├─ ChatRoom/           # 채팅방 컴포넌트
│  │  ├─ ChatBox.tsx
│  │  ├─ ChatRead.tsx
│  │  ├─ Message.tsx
│  │  ├─ MessageDate.tsx
│  │  └─ TextField.tsx
│  ├─ Common/             # 공통 컴포넌트
│  │  ├─ Alert.tsx
│  │  ├─ Header.tsx
│  │  ├─ HomeIndicator.tsx
│  │  ├─ LoadingSpinner.tsx
│  │  ├─ Navibar.tsx
│  │  ├─ Profile.tsx
│  │  ├─ SearchBar.tsx
│  │  └─ StatusBar.tsx
│  ├─ Contact/            # 연락처 컴포넌트
│  │  └─ ContactListItem.tsx
│  └─ Profile/            # 프로필 컴포넌트
│     ├─ EditButton.tsx
│     ├─ PhotoCard.tsx
│     ├─ ToggleTap.tsx
│     └─ UploadButton.tsx
├─ constants/             # 상수
├─ data/                  # 초기 데이터 (JSON)
├─ hooks/                 # 커스텀 훅
├─ layout/                # 공통 레이아웃
├─ pages/                 # 페이지
│  ├─ ChatListPage.tsx    # 채팅 리스트 페이지
│  ├─ ChatRoomPage.tsx    # 채팅방 페이지
│  ├─ ContactPage.tsx     # 연락처 페이지
│  ├─ NotFoundPage.tsx    # 404 페이지
│  ├─ ProfilePage.tsx     # 프로필 페이지
│  ├─ SettingPage.tsx     # 설정 페이지
│  └─ SplashPage.tsx      # 스플래시 페이지
├─ routes/                # 라우터 설정
├─ store/                 # Zustand 전역 상태
│  ├─ chatStore.ts        # 채팅방 상태 관리
│  └─ profileStore.ts     # 프로필 게시물 상태 관리
├─ types/                 # 타입 정의
├─ utils/                 # 유틸 함수
├─ App.tsx                # 최상위 App 컴포넌트
├─ main.tsx               # React 앱 마운트 진입점
└─ index.css              # 글로벌 스타일
```

## 🛠️ 기술 스택

| 구분       | 기술                                                                                                                                                                                                      | 사용 이유                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Framework  | <img src="https://img.shields.io/badge/react-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />                                                                                               | UI 컴포넌트 모듈화 및 상태 변화에 따른 효율적인 렌더링을 위해 도입                                          |
| Language   | <img src="https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" />                                                                                      | 복잡한 메신저 데이터 구조를 정적 타입으로 명확히 정의하여 런타임 에러를 방지하기 위해 도입                  |
| Build Tool | <img src="https://img.shields.io/badge/vite-9135FF.svg?style=for-the-badge&logo=vite&logoColor=FFD62E" />                                                                                                 | HMR을 통한 빠른 개발 서버 구축과 효율적인 빌드 환경 구성을 위해 사용                                        |
| Styling    | <img src="https://img.shields.io/badge/tailwindcss-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" />                                                                                    | 유틸리티 클래스 기반으로 일관된 디자인 시스템을 직관적이고 빠르게 적용하기 위해 사용                        |
| Utility    | <img src="https://img.shields.io/badge/clsx-2E2E2E.svg?style=for-the-badge" /> <img src="https://img.shields.io/badge/tailwind--merge-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" /> | 조건부 클래스 조합(clsx) 및 충돌하는 Tailwind 클래스 자동 병합(tailwind-merge)을 위해 사용                  |
| UI         | <img src="https://img.shields.io/badge/react--spinners-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white" />                                                                                      | 로딩 상태 표시를 위한 스피너 컴포넌트를 활용하기 위해 사용                                                  |
| State      | <img src="https://img.shields.io/badge/zustand-2E2E2E.svg?style=for-the-badge" />                                                                                                                         | 복잡한 채팅 데이터를 가볍게 전역 관리하고, persist 미들웨어 + 커스텀 어댑터로 채팅방별 독립 스토리지 운용   |
| Routing    | <img src="https://img.shields.io/badge/react--router--dom-CA4245.svg?style=for-the-badge&logo=reactrouter&logoColor=white" />                                                                             | SPA 환경에서 뷰 전환을 매끄럽게 처리하기 위한 클라이언트 사이드 라우팅에 사용                               |
| Animation  | <img src="https://img.shields.io/badge/framer--motion-0055FF.svg?style=for-the-badge&logo=framer&logoColor=white" />                                                                                      | 스플래시 등 서비스의 완성도를 높이는 자연스러운 UI 애니메이션과 전환 효과를 구현하기 위해 사용              |
| SVG        | <img src="https://img.shields.io/badge/vite--plugin--svgr-9135FF.svg?style=for-the-badge&logo=vite&logoColor=FFD62E" />                                                                                   | SVG를 React 컴포넌트로 변환하고, `dimensions: false` 옵션으로 사용처에서 크기를 자유롭게 제어하기 위해 사용 |
| Linting    | <img src="https://img.shields.io/badge/eslint-4B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white" />                                                                                              | 코드 컨벤션을 일정하게 유지하고 잠재적인 안티 패턴을 사전에 식별하기 위해 사용                              |
| Formatting | <img src="https://img.shields.io/badge/prettier-1A2B34.svg?style=for-the-badge&logo=prettier&logoColor=F7B93E" />                                                                                         | 코드 포맷을 자동으로 통일하여 협업 시 가독성과 유지보수성을 극대화하기 위해 사용                            |
| Git Hooks  | <img src="https://img.shields.io/badge/husky-2E2E2E.svg?style=for-the-badge" /> <img src="https://img.shields.io/badge/lint--staged-4B5563.svg?style=for-the-badge" />                                    | 커밋 전 린트 및 포맷 검사를 자동화하여 안정적인 코드 품질을 강제하기 위해 도입                              |
| Package    | <img src="https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" />                                                                                                    | 프로젝트 의존성 관리 및 빌드 스크립트 실행을 위해 사용                                                      |
| Deploy     | <img src="https://img.shields.io/badge/vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />                                                                                              | 깃허브 연동을 통한 지속적 배포(CD) 및 빠른 서비스 결과물 호스팅을 위해 사용                                 |

## 👩🏻‍💻 실행 방법

```bash
git clone -b waldls https://github.com/waldls/react-messenger-23rd.git
cd react-messenger-23rd
npm install
npm run dev
```
