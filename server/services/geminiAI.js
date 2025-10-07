import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiAIService {
  constructor(apiKey) {
    if (!apiKey || apiKey === "undefined") {
      console.warn(
        "⚠️ GEMINI_API_KEY missing — AI responses will be disabled."
      );
      this.disabled = true;
      return;
    }

    this.disabled = false;

    try {
      // ✅ Initialize Gemini API
      this.genAI = new GoogleGenerativeAI(apiKey);

      // ✅ Correct stable model name
      this.model = this.genAI.getGenerativeModel({
        model: "models/gemini-2.5-pro",
      });

      console.log(
        "✅ Gemini AI initialized successfully (v1 models/gemini-1.5-pro-latest)"
      );
    } catch (err) {
      console.error("❌ Failed to initialize Gemini AI:", err);
      this.disabled = true;
    }
  }

  async generateResponse(message) {
    if (this.disabled) {
      return `AI is disabled. You said: "${message}"`;
    }

    try {
      const result = await this.model.generateContent(message);
      return result.response.text();
    } catch (error) {
      console.error("❌ AI generateResponse error:", error);
      return "Sorry, I'm having trouble generating a response right now.";
    }
  }
}

export default GeminiAIService;
