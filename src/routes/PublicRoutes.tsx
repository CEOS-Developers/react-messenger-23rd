import { type RouteObject, Navigate } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";
import ChatListPage from "@/pages/ChatListPage";
import ChatRoomPage from "@/pages/ChatRoomPage";
import ContactPage from "@/pages/ContactPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingPage from "@/pages/SettingPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
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
    ],
  },
];

export default publicRoutes;
