import React from "react";
import Layout from "./layout";
import { AuthProvider } from "./context/AuthProvider";
import { WebSocketProvider } from "./context/WebSocketProvider";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <WebSocketProvider>
          <Layout />
        </WebSocketProvider>
      </AuthProvider>
    </div>
  );
}
