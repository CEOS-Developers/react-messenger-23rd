import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import ChatListPage from '@/pages/ChatListPage'
import ChatRoomPage from '@/pages/ChatRoomPage'
import HomePage from '@/pages/HomePage'

function PagePlaceholder() {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="flex-1 bg-white" />
        <NavigationBar />
      </div>
    </PageFrame>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dms" element={<ChatListPage />} />
      <Route path="/dms/:roomId" element={<ChatRoomPage />} />
      <Route path="/alarm" element={<PagePlaceholder />} />
      <Route path="/more" element={<PagePlaceholder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
