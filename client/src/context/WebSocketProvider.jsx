import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const WebSocketContext = createContext(null);
const socket = io("http://localhost:5000"); // Connect to backend WebSocket

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]); // Update state when new message arrives
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
