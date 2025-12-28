
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESEARCH_ITEMS } from "../data";
import { ChatMessage } from "../types";

// Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getResearchSummary = async (query: string): Promise<string> => {
  try {
    const context = RESEARCH_ITEMS.map(item => 
      `${item.title} (${item.year}): ${item.description}`
    ).join('\n');

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        // Use systemInstruction in the config for better context handling
        systemInstruction: `You are a professional LLM research assistant. Context about LLM Evaluation research:\n${context}\n\nInstructions: Provide a professional, concise, and academic summary based on the provided context. Format with markdown.`,
        temperature: 0.7,
      }
    });

    // Extract text using the .text property (not a method)
    return response.text || "I'm sorry, I couldn't generate a summary at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI expert. Please ensure your API environment is correct.";
  }
};

export const chatWithExpert = async (messages: ChatMessage[]) => {
  try {
    const context = RESEARCH_ITEMS.map(item => 
      `${item.title} (${item.year}): ${item.description}`
    ).join('\n');

    const systemInstruction = `You are an expert in Large Language Model (LLM) evaluation. You have access to information about key papers and datasets like MMLU, HELM, GSM8K, HumanEval, etc. Your goal is to help users understand how LLMs are tested and evaluated. Use context: ${context}`;

    // Map the internal ChatMessage roles to Gemini API roles ('user' and 'model')
    const formattedMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: formattedMessages,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    // Access the generated text directly from the response object
    return response.text || "No response received.";
  } catch (error) {
    console.error("Chat Expert Error:", error);
    return "The AI expert is currently unavailable.";
  }
};