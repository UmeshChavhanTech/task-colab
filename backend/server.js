const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");

// ===== LOAD ENV FILE =====
dotenv.config({ path: "./.env" });

console.log("🔥 Server is starting...");

// ===== CHECK ENV =====
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in .env file");
  process.exit(1);
}

console.log("🌍 Connecting to MongoDB...");

// ===== APP INIT =====
const app = express();
const server = http.createServer(app);

// ===== SOCKET.IO =====
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== DATABASE CONNECTION =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ===== SOCKET EVENTS =====
io.on("connection", (socket) => {
  console.log("📡 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("🚀 Task Collaboration Backend Running...");
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error("💥 Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
});
