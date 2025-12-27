
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESEARCH_ITEMS } from "../data";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getResearchSummary = async (query: string): Promise<string> => {
  try {
    const context = RESEARCH_ITEMS.map(item => 
      `${item.title} (${item.year}): ${item.description}`
    ).join('\n');

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context about LLM Evaluation research:\n${context}\n\nUser Question: ${query}\n\nInstructions: Provide a professional, concise, and academic summary based on the provided context or general knowledge if relevant. Format with markdown.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a summary at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI expert. Please ensure your API environment is correct.";
  }
};

export const chatWithExpert = async (messages: {role: string, content: string}[]) => {
  try {
    const context = RESEARCH_ITEMS.map(item => 
      `${item.title} (${item.year}): ${item.description}`
    ).join('\n');

    const systemInstruction = `You are an expert in Large Language Model (LLM) evaluation. You have access to information about key papers and datasets like MMLU, HELM, GSM8K, HumanEval, etc. Your goal is to help users understand how LLMs are tested and evaluated. Use context: ${context}`;

    const formattedMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // For simplicity in this demo, we use generateContent directly with history prepended
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...formattedMessages
      ],
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "No response received.";
  } catch (error) {
    return "The AI expert is currently unavailable.";
  }
};
