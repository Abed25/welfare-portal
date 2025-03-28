import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import "./utils/db.mjs";
import routes from "./routes/index.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server for Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to allow specific origins
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`✅ Client Connected: ${socket.id}`);

  socket.on("sendMessage", (message) => {
    console.log("📩 Message Received:", message);

    // Emit message to all clients first (non-blocking)
    io.emit("receiveMessage", message);

    // Only save messages with specific types
    const saveTypes = ["studentReq", "feedback", "generalQuery"];
    if (!saveTypes.includes(message.type)) return;

    let apiUrl = "";
    switch (message.type) {
      case "studentReq":
        apiUrl = "http://localhost:5000/api/submit-form";
        break;
      case "feedback":
        apiUrl = "http://localhost:5000/api/submit-feedback";
        break;
      case "generalQuery":
        apiUrl = "http://localhost:5000/api/general-query";
        break;
    }

    console.log(`🚀 Sending request to: ${apiUrl}`);

    // Execute fetch request asynchronously, without blocking WebSocket response
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("❌ Error saving message:", data.error);
        }
      })
      .catch((error) => console.error("❌ Error in sendMessage:", error));
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server listening at port ${PORT}...`);
});
