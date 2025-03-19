import React from "react";
import Layout from "./layout";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </div>
  );
}
