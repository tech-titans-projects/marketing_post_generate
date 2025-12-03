
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateOptions } from '../types';
import { PROMPTS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function buildUserMessage(options: GenerateOptions): string {
  let template = PROMPTS[options.copyType].userPromptTemplate;
  template = template.replace('{{length}}', options.length);
  template = template.replace('{{productName}}', options.productName);
  template = template.replace('{{targetAudience}}', options.targetAudience);
  template = template.replace('{{features}}', options.features);
  template = template.replace('{{tone}}', options.tone);
  return template;
}

export function startChat(options: GenerateOptions): Chat {
    const systemInstruction = PROMPTS[options.copyType].systemInstruction;
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
            temperature: options.creativity,
        }
    });
    return chat;
}

export async function sendMessage(chat: Chat, message: string): Promise<string> {
    try {
        const response = await chat.sendMessage({ message });

        const text = response.text;
        if (!text) {
            throw new Error("API returned an empty response.");
        }
        return text;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("The request to the AI service failed. This could be due to network issues, an invalid API key, or the content policy.");
    }
}
