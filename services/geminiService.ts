
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProfileSummary = async (jobTitle: string, skills: string[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI service is unavailable. Please configure the API key.";
  }

  const prompt = `
    You are an expert CV writer for the Sri Lankan job market.
    Based on the job title "${jobTitle}" and the following skills: ${skills.join(', ')}.
    Write a professional and compelling profile summary for a job seeker's resume.
    The summary should be approximately 3-4 sentences long, highlighting key strengths and career aspirations.
    Do not use markdown or any special formatting. Just return the plain text summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not generate summary due to an error. Please try again later.";
  }
};