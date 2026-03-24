import { type RouteObject, Navigate } from "react-router-dom";

import PublicLayout from "@/layout/PublicLayout";

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
        element: <div>내 프로필</div>,
      },
      {
        path: "contact",
        element: <div>연락처</div>,
      },
      {
        path: "chat",
        element: <div>대화</div>,
      },
      {
        path: "chat/:id",
        element: <div>채팅방 상세</div>,
      },
      {
        path: "setting",
        element: <div>설정</div>,
      },
    ],
  },
];

export default publicRoutes;
