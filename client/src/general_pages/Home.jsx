import React from "react";
import { useAuth } from "../context/AuthProvider"; // Adjust path if needed

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>This is a general homepage</h1>
      <p>Current User: {user ? user.email : "No user logged in"}</p>
      <p>{user.role}</p>
    </div>
  );
}
