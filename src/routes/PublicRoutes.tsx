import { type RouteObject } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";
import ChatListPage from "@/pages/ChatListPage";
import ChatRoomPage from "@/pages/ChatRoomPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingPage from "@/pages/SettingPage";
import SplashPage from "@/pages/SplashPage";

const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <SplashPage />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "chat",
        element: <ChatListPage />,
      },
      {
        path: "chat/:id",
        element: <ChatRoomPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export default publicRoutes;
