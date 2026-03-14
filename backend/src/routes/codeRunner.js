// routes/codeRunner.js
import express from "express";

const router = express.Router();

const PISTON_URL =
  "https://fantastic-space-rotary-phone-4jw56grr79jv3q6vp-3000.app.github.dev";

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
