import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage.tsx';
import { ChatListPage } from '../pages/ChatListPage.tsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatPage/>}/>
          <Route path='/chat' element={<ChatListPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
