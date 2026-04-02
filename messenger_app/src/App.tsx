import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage.tsx';
import { ChatListPage } from '../pages/ChatListPage.tsx';
import { CallPage } from '../pages/CallPage.tsx';
import { ProfilePage } from '../pages/ProfilePage.tsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatPage/>}/>
          <Route path='/call' element={<CallPage/>}/>
          <Route path='/chat' element={<ChatListPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
