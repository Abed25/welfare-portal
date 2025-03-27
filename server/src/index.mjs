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
    io.emit("receiveMessage", message); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server listening at port ${PORT}...`);
});
