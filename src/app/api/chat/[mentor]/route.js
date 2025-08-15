import { NextResponse } from "next/server";
import OpenAI from "openai";
import SYSTEM_PROMPTS from "../../../../helpers/systemPrompt.js"

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(request, { params }) {
  const { mentor } = await params;
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const prompt = SYSTEM_PROMPTS[mentor] || "You are a helpful AI assistant.";

  const completion = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: message },
    ],
  });

  return NextResponse.json({
    response: completion.choices[0].message.content
  });
}
