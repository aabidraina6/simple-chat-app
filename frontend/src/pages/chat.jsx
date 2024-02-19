import Message from "./message";
import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-o2b3.onrender.com", {
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
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const newname = location.state ? location.state.name : "Anonymous";

  useEffect(() => {
    socket.emit("ready");
  }, []);

  useEffect(() => {
    console.log("useEffect");

    socket.on("init", (data) => {
      console.log("init", data);

      setMessages(data);
      setLoading(false);
    });
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendMessage = () => {
    if (input) {
      let date = new Date();
      let options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      let timeString = date.toLocaleTimeString("en-US", options);
      socket.emit("message", {
        name: newname,
        message: input,
        time: timeString,
      });
      setInput("");
    }
  };

  {
    loading && (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <div className="animate-spin mb-4"></div>
          Loading...
        </div>
      </div>
    );
  }

  const msgElement = messages.map((message, index) => {
    return (
      <div className={`flex ${message.name !== newname ? "justify-end" : ""}`}>
        <Message
          key={index}
          name={message.name}
          message={message.message}
          time={message.time}
          flag={message.name === newname}
        />
      </div>
    );
  });

  console.log(newname);
  return (
    <div className="flex flex-col h-screen gap-2 bg-blue-200">
      <div className=" flex-grow">{msgElement}</div>
      <div className="flex container mx-auto py-1 gap-2">
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
