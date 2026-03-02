// routes/codeRunner.js
import express from "express";

const router = express.Router();

router.post("/execute", async (req, res) => {
  try {
    const { language, version, files } = req.body;

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, version, files }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Piston error:", err.message);
    res.status(500).json({ error: "Code execution failed" });
  }
});

export default router;
