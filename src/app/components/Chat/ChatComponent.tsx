"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../styles/chat.sass"; // импорт стилей

const socket = io("http://localhost:4000"); // URL вашего сервера

const ChatComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const [nextId, setNextId] = useState<number>(1); // Используем id для уникальности сообщений

  useEffect(() => {
    // Слушаем события новых сообщений
    socket.on("chatMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNextId((prevId) => prevId + 1);
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { id: nextId, text: `Player: ${message}` };
      socket.emit("sendMessage", newMessage); // Отправляем сообщение на сервер
      setMessage("");
    }
  };

  return (
    <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
      <div className="chat-header">
        <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </button>
        <span>Online Chat</span>
      </div>
      {isOpen && (
        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className="chat-message">
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
