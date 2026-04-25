import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import ChatListPage from '@/pages/ChatListPage'
import ChatRoomPage from '@/pages/ChatRoomPage'

function HomePlaceholder() {
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
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/dms" element={<ChatListPage />} />
      <Route path="/dms/:roomId" element={<ChatRoomPage />} />
      <Route path="/alarm" element={<HomePlaceholder />} />
      <Route path="/more" element={<HomePlaceholder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
