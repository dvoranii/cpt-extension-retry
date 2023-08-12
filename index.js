const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

app.post("/api/connect", async (req, res) => {
  const apiKey = req.body.apiKey;

  // OpenAI endpoint
  const openAIEndpoint =
    "https://api.openai.com/v1/engines/davinci/completions";
  const promptData = {
    prompt: "Translate the following English text to French: 'Hello World!'",
    max_tokens: 150,
  };
  try {
    const openAIResponse = await fetch(openAIEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(promptData),
    });
    const data = await openAIResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Error connecting to OpenAI:", error);
    res.status(500).json({ message: "Failed to connect to OpenAI" });
  }
});

module.exports = app;
