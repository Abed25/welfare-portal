import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("🛠️ Attempting WebSocket connection...");
    
    const newSocket = io("http://localhost:5000", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ WebSocket Connected! ID:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ WebSocket Disconnected.");
    });

    newSocket.on("receiveMessage", (message) => {
      console.log("📩 Received Message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      console.log("🔌 Disconnecting WebSocket...");
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      console.log("🚀 Sending Message:", message);
      socket.emit("sendMessage", message);
    } else {
      console.error("❌ No active WebSocket connection.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
