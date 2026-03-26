import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const body = req.body;

  if (!body?.messages) {
    return res.status(400).json({ error: "No messages provided" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: body.messages,
    });
    res.status(200).json(completion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
