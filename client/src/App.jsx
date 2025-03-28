import React from "react";
import Layout from "./layout";
import { AuthProvider } from "./context/AuthProvider";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

export default function App() {
  return (
    <div>
      <AuthProvider>
        <WebSocketProvider>
          <Layout />
          <ToastContainer position="top-center" autoClose={3000} />
        </WebSocketProvider>
      </AuthProvider>
    </div>
  );
}
