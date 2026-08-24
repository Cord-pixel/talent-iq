import express from "express";
import { GoogleGenAI } from "@google/genai";
import { ENV } from "../lib/env.js";

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided for analysis." });
  }

  const prompt = `
        Analyze the following ${language || "code"} snippet. 
        Evaluate its efficiency and provide a strict JSON output matching this schema:
        {
          "timeComplexity": "e.g. O(N)",
          "spaceComplexity": "e.g. O(1)",
          "optimizationTip": "Short suggestion on how to optimize it"
        }

        Code:
        ${code}
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash", // Updated to supported active model
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const analysis = JSON.parse(response.text);
    res.status(200).json(analysis);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to analyze code complexity." });
  }
});

export default router;
