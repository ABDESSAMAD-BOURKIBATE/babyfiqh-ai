
import { GoogleGenAI, Modality, Chat, GenerateContentResponse, Part, LiveServerMessage } from "@google/genai";

// Helper to get API Key safely
const getApiKey = () => {
    const key = process.env.API_KEY;
    if (!key) {
        console.error("API_KEY is missing in environment variables");
        return "";
    }
    // Signal that a key exists (without printing it) for client-side debug
    try { console.debug("API_KEY available"); } catch (e) {}
    return key;
};

// We initialize a default instance for standard chat, but live session will create its own
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export { Chat };

// Chat Creation with dynamic instruction
export const createLimanourChat = (systemInstruction: string): Chat => {
    const key = getApiKey();
    if (!key) throw new Error("API Key missing");
    
    const localAi = new GoogleGenAI({ apiKey: key });
    return localAi.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction
        },
        history: [],
    });
};

// Standard Message Streaming
export const sendMessageStreamToLimanour = async (
    chat: Chat,
    messageParts: Part[]
): Promise<AsyncGenerator<GenerateContentResponse>> => {
    const result = await chat.sendMessageStream({ message: messageParts });
    return result;
};

// TTS Generation (Legacy/Standard Mode)
export const generateSpeech = async (text: string, voiceName: string = 'Fenrir'): Promise<string> => {
    if (!text.trim()) return '';
    const key = getApiKey();
    if (!key) throw new Error("API Key missing");

    const localAi = new GoogleGenAI({ apiKey: key });
    
    // Contextual prompt for TTS to ensure tone matches
    const speechPrompt = `Speak nicely with a warm, wise, fatherly tone. Say: "${text}"`;

    const response = await localAi.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: speechPrompt }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voiceName },
                },
            },
        },
    });

    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) {
        throw new Error("Failed to generate speech data.");
    }
    return audioData;
};

// --- LIVE API Implementation ---

interface LiveSessionCallbacks {
    onOpen: () => void;
    onAudioData: (base64Audio: string) => void;
    onTranscription?: (text: string) => void; // New callback
    onClose: () => void;
    onError: (error: any) => void;
}

// New version with Transcription enabled
export const connectToSmartLiveSession = async (
    callbacks: LiveSessionCallbacks, 
    systemInstruction: string,
    voiceName: string = 'Fenrir'
) => {
    const key = getApiKey();
    if (!key) {
        callbacks.onError(new Error("API Key is missing. Please check your .env file."));
        throw new Error("API Key is missing");
    }

    // Create a fresh instance for the live session to ensure no stale state
    const liveAi = new GoogleGenAI({ apiKey: key });

    return liveAi.live.connect({
        model: 'gemini-2.0-flash-exp',
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } },
            },
            systemInstruction: systemInstruction,
            outputAudioTranscription: {} // Enable transcription
        },
        callbacks: {
            onopen: () => {
                callbacks.onOpen();
            },
            onmessage: (message: LiveServerMessage) => {
                // Handle Audio
                const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio) {
                    callbacks.onAudioData(base64Audio);
                }

                // Handle Transcription for Emotion Analysis
                // Check various possible locations for text in the response
                const textPart = message.serverContent?.modelTurn?.parts?.find(p => p.text);
                if (textPart && textPart.text && callbacks.onTranscription) {
                     callbacks.onTranscription(textPart.text);
                }
                
                if (message.serverContent?.outputTranscription?.text && callbacks.onTranscription) {
                    callbacks.onTranscription(message.serverContent.outputTranscription.text);
                }
            },
            onclose: () => {
                callbacks.onClose();
            },
            onerror: (e) => {
                console.error("Gemini Live Error:", e);
                callbacks.onError(e);
            }
        }
    });
};
