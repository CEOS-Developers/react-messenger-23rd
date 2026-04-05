import { type RouteObject, Navigate } from 'react-router-dom'

import PublicLayout from '@/layout/PublicLayout'
import ChatList from '@/pages/ChatList'
import Chat from '@/pages/Chat'
import MyProfile from '@/pages/MyProfile'
import Friends from '@/pages/Friends'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="myprofile"
            replace
          />
        ),
      },
      {
        path: 'chatlist',
        element: <ChatList />,
      },
      {
        path: 'chat/:id',
        element: <Chat />,
      },
      {
        path: 'myprofile',
        element: <MyProfile />,
      },
      {
        path: 'friends',
        element: <Friends />,
      },
    ],
  },
]
