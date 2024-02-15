import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route , Link } from "react-router-dom";
import Login from "./pages/login";
import Chat from "./pages/chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route
  path="*"
  element={
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go back to home page
      </Link>
    </div>
  }
/>        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
