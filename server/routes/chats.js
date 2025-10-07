// server/routes/chats.js
import express from "express";
import Chat from "../models/Chat.js";

export default (geminiAI) => {
  const router = express.Router();

  /**
   * Create a new chat
   */
  router.post("/", async (req, res) => {
    try {
      let { chatType, title } = req.body;
      chatType = chatType || "diet";

      const chat = new Chat({
        chatType,
        title: title || `New ${chatType} chat`,
        messages: [],
      });

      await chat.save();

      res.status(201).json({
        chat: {
          _id: chat._id,
          title: chat.title,
          chatType: chat.chatType,
          messages: chat.messages,
          updatedAt: chat.updatedAt || new Date(),
        },
      });
    } catch (error) {
      console.error("Create chat error:", error);
      res.status(500).json({ message: "Failed to create chat" });
    }
  });

  /**
   * Send a message to AI and save response
   */
  router.post("/:chatType?", async (req, res) => {
    try {
      const { chatId, message } = req.body;
      const chatType = req.params.chatType || "diet";

      if (!chatId)
        return res.status(400).json({ message: "chatId is required" });
      if (!message)
        return res.status(400).json({ message: "Message is required" });

      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: "Chat not found" });

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: message,
        sender: "user",
        timestamp: new Date(),
      };
      chat.messages.push(userMessage);

      // Get AI response
      const aiResponse = await geminiAI.generateResponse(message, chatType);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      chat.messages.push(aiMessage);

      // Generate chat title if empty
      if (chat.messages.length === 2) {
        chat.title = generateChatTitle(message, chatType);
      }

      chat.updatedAt = new Date();
      await chat.save();

      res.json({ aiMessage });
    } catch (error) {
      console.error("Send message error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  /**
   * Fetch all chats (optionally filtered by chatType)
   */
  router.get("/", async (req, res) => {
    try {
      const { chatType } = req.query;
      const filter = chatType ? { chatType } : {};
      const chats = await Chat.find(filter).sort({ updatedAt: -1 });

      res.json({
        chats: chats.map((chat) => ({
          _id: chat._id,
          title: chat.title,
          chatType: chat.chatType,
          messages: chat.messages,
          updatedAt: chat.updatedAt,
        })),
      });
    } catch (error) {
      console.error("Fetch chats error:", error);
      res.status(500).json({ message: "Failed to fetch chats" });
    }
  });

  /**
   * Fetch a single chat by ID
   */
  router.get("/:chatId", async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: "Chat not found" });

      res.json({
        chat: {
          _id: chat._id,
          title: chat.title,
          chatType: chat.chatType,
          messages: chat.messages,
          updatedAt: chat.updatedAt,
        },
      });
    } catch (error) {
      console.error("Fetch chat by ID error:", error);
      res.status(500).json({ message: "Failed to fetch chat" });
    }
  });

  // Helper to generate a chat title from first user message
  function generateChatTitle(message, chatType) {
    const words = message.split(" ").slice(0, 4).join(" ");
    const typePrefix = { diet: "🍎", skincare: "✨", wellbeing: "🧠" };
    return `${typePrefix[chatType] || ""} ${words}${
      words.length < message.length ? "..." : ""
    }`;
  }

  return router;
};
