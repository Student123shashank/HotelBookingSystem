import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:1000/api/v1/chat", { message: userMessage });
      const botMessage = response.data.reply;
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, I am having trouble responding." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Chat
      </button>

      {isOpen && (
        <div className={`fixed bottom-20 right-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} w-80 h-96 shadow-lg rounded-lg flex flex-col`}>
          <div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
            <span>Hotel Chatbot</span>
            <button onClick={toggleChatbot} className="text-white">x</button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-md ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-4 border-t border-gray-300">
            <input
              type="text"
              className={`flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hotels..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
