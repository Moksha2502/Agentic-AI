// server/index.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables early

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import chatRoutes from "./routes/chats.js";
import paymentRoutes from "./routes/payments.js"; // optional
import GeminiAIService from "./services/geminiAI.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- Middleware -------------------
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

// ------------------- MongoDB Connection -------------------
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/nutriderma-ai";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ------------------- Initialize Gemini AI -------------------
const geminiAI = new GeminiAIService(process.env.GEMINI_API_KEY);

// ------------------- Optional Test Chat Endpoint -------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await geminiAI.generateResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------- Routes -------------------
app.use("/api/chats", chatRoutes(geminiAI)); // ✅ Pass AI instance here
app.use("/api/payments", paymentRoutes); // Optional, if you have payment routes

// ------------------- Health Check -------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    mongoConnection: mongoose.connection.readyState,
    timestamp: new Date(),
  });
});

// ------------------- Global Error Handler -------------------
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
