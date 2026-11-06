// Vercel serverless function: POST /api/chat
// Keeps the Gemini API key on the server. Never expose it in index.html.
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini is not configured yet. Add GEMINI_API_KEY in Vercel Project Settings → Environment Variables, then redeploy."
    });
  }

  try {
    const body = req.body || {};
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return res.status(400).json({ error: "Please enter a message." });
    if (message.length > 12000) {
      return res.status(413).json({ error: "Message is too long. Please keep it under 12,000 characters." });
    }

    const allowedRoles = new Set(["user", "model"]);
    const history = Array.isArray(body.history) ? body.history.slice(-20) : [];
    const contents = history
      .filter(item => item && allowedRoles.has(item.role) && typeof item.content === "string")
      .map(item => ({
        role: item.role,
        parts: [{ text: item.content.slice(0, 12000) }]
      }));

    // The current user message is already included in the frontend history.
    // Add it only if the latest history item does not match.
    const last = contents[contents.length - 1];
    if (!last || last.role !== "user" || last.parts[0].text !== message) {
      contents.push({ role: "user", parts: [{ text: message }] });
    }
    while (contents.length && contents[0].role !== "user") contents.shift();

    const mode = typeof body.mode === "string" ? body.mode.slice(0, 40) : "general";
    const suppliedSystem = typeof body.systemInstruction === "string"
      ? body.systemInstruction.slice(0, 6000)
      : "";
    const systemInstruction = [
      "You are Seniors Ai, a helpful and accurate AI assistant.",
      "Reply in the same language as the user (including Urdu, Roman Urdu, or English).",
      "Use clear Markdown. Use fenced code blocks for code.",
      "Be honest about uncertainty. Do not invent facts, sources, or capabilities.",
      "Assistant mode: " + mode + ".",
      suppliedSystem
    ].filter(Boolean).join("\n\n");

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" +
      encodeURIComponent(apiKey);

    const googleResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096
        }
      })
    });

    const result = await googleResponse.json().catch(() => ({}));
    if (!googleResponse.ok) {
      const status = googleResponse.status === 429 ? 429 : 502;
      const messageFromGoogle =
        result && result.error && result.error.message
          ? result.error.message
          : "The Gemini API request could not be completed.";
      return res.status(status).json({
        error: googleResponse.status === 429
          ? "Gemini rate limit or quota reached. Please wait and try again."
          : "Gemini API error: " + messageFromGoogle
      });
    }

    const reply = (result.candidates || [])
      .flatMap(candidate => (candidate.content && candidate.content.parts) || [])
      .map(part => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return res.status(502).json({
        error: "Gemini did not return text. Try rephrasing your message."
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Seniors Ai Gemini function error:", error && error.message);
    return res.status(500).json({
      error: "The server could not process this request. Check the Vercel Function Logs."
    });
  }
};
