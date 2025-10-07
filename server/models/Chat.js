import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: String, enum: ["user", "ai"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  // Make userId optional for auth-free setup
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  chatType: {
    type: String,
    enum: ["diet", "skincare", "wellbeing"],
    required: true,
  },
  title: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update updatedAt before saving
ChatSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for faster queries (optional)
ChatSchema.index({ userId: 1, updatedAt: -1 });
ChatSchema.index({ userId: 1, chatType: 1 });

export default mongoose.model("Chat", ChatSchema);
