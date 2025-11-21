import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the AI Tutor
const TUTOR_INSTRUCTION = `You are Mr. Karim's AI Assistant, an encouraging and fun English teacher.
Your goal is to help students improve their English skills, specifically focusing on Grammar topics like Transitive and Intransitive verbs.
- Correct their grammar gently.
- Explain complex concepts simply using fun examples.
- Use emojis occasionally to keep the tone light.
- If asked about non-English topics, politely steer the conversation back to English learning.
- Always be supportive like Mr. Karim would be.`;

export const chatWithTutor = async (history: { role: string; parts: { text: string }[] }[], message: string) => {
  if (!apiKey) throw new Error("API Key not found");

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: TUTOR_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having a little trouble connecting right now. Please try again later!";
  }
};

export const generateQuiz = async (topic: string, level: string): Promise<any[]> => {
  if (!apiKey) throw new Error("API Key not found");

  const prompt = `Generate a structured JSON quiz about "${topic}" for ${level} level English students. 
  Create exactly 5 multiple-choice questions. Make the examples fun and clear.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING } 
              },
              correctAnswer: { 
                type: Type.INTEGER,
                description: "The index of the correct answer (0-3)" 
              },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return [];
  }
};