import './App.css';
import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './pages/login';
import Chat from './pages/chat';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/chat" element={<Chat/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
