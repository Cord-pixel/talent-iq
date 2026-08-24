// routes/codeRunner.js
import express from "express";
import { ENV } from "../lib/env.js";

const router = express.Router();
const PISTON_URL = ENV.PISTON_URL;

router.post("/execute", async (req, res) => {
  try {
    const { language, version, files } = req.body;

    const response = await fetch(`${PISTON_URL}/api/v2/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, version, files }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Execution error:", err.message);
    res.status(500).json({ error: "Code execution failed" });
  }
});

export default router;
