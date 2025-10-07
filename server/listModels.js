import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Available models:");
    data.models.forEach((m) => console.log(m.name));
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
