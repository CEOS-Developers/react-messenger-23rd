# Week 3 & 4: React Messenger

CEOS 23rd Frontend Study — Weeks 3 and 4, an ongoing project building a Messenger app in collaboration with a designer.

🔗 [Try it out](https://ceos-week3-react-messenger-23rd.vercel.app)

## Overview

Starting Week 3, the mission shifted from solo assignments to a project built in collaboration with a designer, with TypeScript and Tailwind CSS required going forward. Over these two weeks, the messenger grew from a single chat screen into a small multi-page web app.

## Preview
<img width="230" height="" alt="image" src="https://github.com/user-attachments/assets/b047c8cc-cdc9-493a-b471-261d2f09a84c" />
<img width="230" height="" alt="image" src="https://github.com/user-attachments/assets/b537c75e-d5ee-4cc2-a260-e73cbb3ad223" />
<img width="230" height="" alt="image" src="https://github.com/user-attachments/assets/2e9ef1e5-78c1-4129-87dc-5f33e4c79976" />
<img width="230" height="" alt="image" src="https://github.com/user-attachments/assets/5a621a2c-4624-4b10-9d17-aa2d09a7ca5a" />

### What the app does (as of Week 4)

- Chat screen with message bubbles, showing each sender's profile photo and name
- Friends list page
- Chat room list page, with pin/unpin support to keep specific chats at the top
- Routing between friends list, chat room list, and individual chat rooms (via React Router)
- Chat room data persisted to `localStorage`, so it survives a page refresh
- User and message data managed through JSON files
- Styled with Tailwind CSS, based on Figma designs implemented via Dev Mode

### Folder Structure — Feature-Sliced Design (FSD)

I structured the project using all of FSD's core layers (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). The layer names were in place, but the separation wasn't as deep as it should've been — the `features` layer, for example, ended up mostly empty, with logic that should've lived there sitting inside `widgets` or `pages` instead. A good first attempt at understanding what each layer is supposed to own, and something to apply more rigorously next time.

---

## Week 3

### Deadline

- Saturday, March 28, 2026, 23:59 KST

### About / Mission Goals

This week's mission was a new project — a **Messenger** app — built in collaboration with a designer. The goal was to implement a chat screen redesigned by the design team, using **TypeScript** and **Tailwind CSS** for the first time. The mission also focused on core React Hooks — `useState`, `useEffect`, and `useRef`.

### Working with a Designer

This was also my first time collaborating directly with a designer. To keep communication smooth, I organized QA using a shared table (priority, page, title, description, progress, questions), with frontend-authored items prefixed "FE" so it was clear at a glance who wrote what.

Before each deployment, I'd share which styles and features I planned to implement, then deploy so the designer could review the result in near real-time — checking in, adjusting, and building the app up incrementally rather than all at once.

---

## Week 4

### Deadline

- Saturday, April 25, 2026, 23:59 KST

### About / Mission Goals

This week extended the messenger with a friends list and chat room list, and introduced **React Router** for page-level navigation. The focus was on understanding routing in a single-page application (SPA) — dynamic routes, URL parameters, and smooth transitions between pages.

**Additional feature — pinning chat rooms:**
- **Pin**: clicking next to a chat's name or member count (transparent by default) pins it to the top of the list.
- **Unpin**: clicking the pin icon moves the chat just below the last pinned item, back into the regular list.

---

## Review Questions

**1.What is dynamic routing in React Router, and when is it used?**

Dynamic routing captures part of the URL as a variable, so a single component can handle multiple pages depending on that value. It's useful for pages that share the same layout but differ only in data — user profiles, post edit pages, blog details, product pages, and so on.

**2.What UI/UX and technical strategies help improve the experience on slow networks?**

On the UX side, showing a loading state instead of a blank screen keeps the app from feeling stuck, and rendering content progressively — rather than waiting for everything to load — keeps things feeling responsive.

On the technical side, reducing image size and using a library like React Query to cache and reuse server data both cut down on how often (and how much) data needs to be fetched.

**3.What's the difference between local state (`useState`/`useReducer`) and global state (Context API / a state library)?**

`useState` fits simple local state well — a modal's open/closed status, an input's value, a counter. `useReducer` is better suited for more complex state logic, like a shopping cart with several related actions.

The Context API works well for passing a value down through several components without prop-drilling. A dedicated state library is better suited for larger apps with more complex global state.

**4.JSX / JS / TSX / TS — what are they, and how do they differ?**

- **JSX** is a JavaScript syntax extension for writing HTML-like markup inside JS, mainly for UI in React. Browsers can't read JSX directly, so a tool like Babel compiles it into plain JS first.

```jsx
  // Without JSX
  function Hello() {
    return React.createElement("h1", null, "Hello!");
  }

  // With JSX
  function Hello() {
    return <h1>Hello!</h1>;
  }
```

- **JS** is the language that runs in the browser. It's dynamically typed — no type declarations up front, which is fast to write but means type errors only surface at runtime.

```js
  let name = "John";
  let age = 25;

  function greet(user) {
    return "Hello, " + user;
  }
```

- **TSX** is a file format for writing JSX with TypeScript — used for React components written in TS.

```tsx
  interface Props {
    name: string;
    age: number;
  }

  function UserCard({ name, age }: Props) {
    return (
      <div>
        <h2>{name}</h2>
        <p>Age: {age}</p>
      </div>
    );
  }
```

- **TS** is a superset of JavaScript, created by Microsoft, that adds static typing. Existing JS code works in TS as-is; TS files compile down to JS before running.

```ts
  let name: string = "John";
  let age: number = 25;

  function add(a: number, b: number): number {
    return a + b;
  }

  add(1, "2"); // caught at compile time
```

**5.Why use TypeScript?**

1. JS errors only surface at runtime. TypeScript catches them at write-time, right in the editor.
2. Declared types let editors like VS Code auto-suggest available properties and methods (IntelliSense), speeding up development.
3. Explicit types make it immediately clear what a function expects and returns — easier for others to read, easier to maintain.

**6.SSR vs. CSR — what's the difference?**

**CSR (Client-Side Rendering)** renders the page in the browser: the server sends mostly empty HTML plus JS, and the browser runs the JS to build the page. This is React's default. Initial load can feel slower since the page isn't visible until JS finishes running, and an empty HTML shell hurts SEO — but once loaded, page transitions are fast and server load stays low.

**SSR (Server-Side Rendering)** renders the HTML on the server first, so content is visible before the JS even finishes loading. Next.js is a well-known SSR framework. This means faster initial loads and better SEO, at the cost of higher server load since each navigation may trigger a new server request.

## Stack

- React + TypeScript
- Tailwind CSS
- React Router

## What I learned

- Working with a designer for the first time meant learning to stay in sync — sharing progress before and after each deployment made the process feel collaborative rather than sequential.
- FSD looked straightforward to set up, but keeping logic in the right layer (especially `features`) took more discipline than expected.
- Adding React Router turned a single-screen demo into something that actually feels like a navigable app.

## Links & References

- [React Docs](https://ko.react.dev/learn)
- [A Complete Guide to React Hooks (Korean)](https://velog.io/@velopert/react-hooks#1-usestate)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Coding Conventions (Korean)](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
- [TypeScript Handbook (Korean)](https://joshua1988.github.io/ts/intro.html)
- [Using TypeScript in React Projects — Series (Korean)](https://velog.io/@velopert/series/react-with-typescript)
- [Building a Design System (Korean)](https://yozm.wishket.com/magazine/detail/1830/)
- [Video: Understanding Components (Korean)](https://www.youtube.com/watch?v=21eiJc90ggo)
- [Tailwind CSS Guide (Korean)](https://www.heropy.dev/p/E67ZHS)
- [Setting Up TS Absolute Paths (Korean)](https://tesseractjh.tistory.com/232)

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
