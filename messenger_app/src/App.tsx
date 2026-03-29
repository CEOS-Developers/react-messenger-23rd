import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ChatPage } from '../pages/ChatPage.tsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
