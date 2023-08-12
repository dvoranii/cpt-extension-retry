import express, { json } from "express";
import fetch from "node-fetch";

const app = express();

app.use(json());

app.get("/api/connect", (req, res) => {
  console.log("Welcome!");
  res.send("Welcome to the API!");
});

app.post("/api/connect", async (req, res) => {
  const apiKey = req.body.apiKey;

  // OpenAI endpoint
  const openAIEndpoint =
    "https://api.openai.com/v1/engines/davinci/completions";
  const promptData = {
    prompt:
      "Compose a short, four-line poem celebrating the grace and beauty of cats.",
    max_tokens: 50,
    temperature: 0.6,
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
    res.json({ poem: data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error connecting to OpenAI:", error);
    res.status(500).json({ message: "Failed to connect to OpenAI" });
  }
});

export default app;
