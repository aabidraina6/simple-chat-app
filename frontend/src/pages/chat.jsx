import Message from "./message";
import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
  transports: ["websocket", "polling"],
});

export default function Chat() {
  console.log(socket.id);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const newname = location.state ? location.state.name : "Anonymous";

  useEffect(() => {
    socket.on("init", (data) => {
      setMessages(data);
    });
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = () => {
    if (input) {
      socket.emit("message", { name: newname, message: input });
      setInput("");
    }
  };

  const msgElement = messages.map((message, index) => {
    return (
      <div className={`flex ${message.name !== newname ? 'justify-end' : ''}`}>
        <Message key={index} name={message.name} message={message.message} />
      </div>
    );
  });

  console.log(newname);
  return (
    <div className="flex flex-col h-screen gap-2 bg-blue-200">
      <div className=" flex-grow">{msgElement}</div>
      <div className="flex container mx-auto py-10 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message here..."
          className="border rounded-md px-4 py-2 w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <svg
            className="h-8 w-8 "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
