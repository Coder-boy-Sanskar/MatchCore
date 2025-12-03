import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askGroq() {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ⚡ extremely fast
    messages: [
      {
        role: "user",
        content: `
Extract structured job filters from this text.
Correct spelling automatically.

Text: "Jobs for backnd developr in blr"

Return **only JSON**. Do not write any explanations, functions, or code blocks. The JSON keys must be:
{
  "job_title": "",
  "skills": [],
  "location": "",
  "experience": "",
  "salary": "",
  "other_keywords": []
}
`,
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

askGroq();
