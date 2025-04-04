import React, { useContext } from "react";
import { WebSocketContext } from "../context/WebSocketProvider";

export default function Test() {
  const { messages } = useContext(WebSocketContext);

  return (
    <div>
      <h1>Test Page</h1>
      <h3>Received Messages:</h3>
      <div>
        {messages.length > 0 ? (
          <ul>
            {messages
              .filter((msg) => msg.type === "studentReq") // ✅ Only studentReq messages
              .map((msg, index) => (
                <li key={index} style={{ color: "blue" }}>
                  {" "}
                  {msg.message}
                </li>
              ))}
          </ul>
        ) : (
          <p>No messages received yet.</p>
        )}
      </div>
    </div>
  );
}

{
  /* Receiving all messages body */
}
{
  /* {messages.length > 0 ? (
          messages.map((msg, index) => (
            <pre key={index}>
              📥 Received Data: {JSON.stringify(msg, null, 2)}
            </pre>
          )) */
}
