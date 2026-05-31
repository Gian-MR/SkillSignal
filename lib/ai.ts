import "server-only";

import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required to use AI features.");
}

export const openai = new OpenAI({
  apiKey,
});

export const skillExtractionModel = "gpt-5-mini";
