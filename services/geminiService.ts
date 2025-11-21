
import { GoogleGenAI, Modality, Chat, GenerateContentResponse, Part, LiveServerMessage } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable not set");
}

let ai: any;
try {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
        console.warn("GoogleGenAI not initialized: Missing API Key");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
}

export { Chat };

// Chat Creation with dynamic instruction
export const createLimanourChat = (systemInstruction: string): Chat => {
    if (!ai) throw new Error("AI service not initialized");
    return ai.chats.create({
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

// TTS Generation (Legacy/Standard Mode) with language context
export const generateSpeech = async (text: string, voiceName: string = 'Fenrir'): Promise<string> => {
    if (!text.trim()) return '';

    // Contextual prompt for TTS to ensure tone matches
    const speechPrompt = `Speak nicely with a warm, wise, fatherly tone. Say: "${text}"`;

    if (!ai) throw new Error("AI service not initialized");

    const response = await ai.models.generateContent({
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

export const connectToLiveSession = async (
    callbacks: LiveSessionCallbacks,
    systemInstruction: string,
    voiceName: string = 'Fenrir'
) => {
    if (!ai) throw new Error("AI service not initialized");
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } },
            },
            systemInstruction: systemInstruction,
        },
        callbacks: {
            onopen: () => {
                callbacks.onOpen();
            },
            onmessage: (message: LiveServerMessage) => {
                // Handle Audio
                const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                if (base64Audio) {
                    callbacks.onAudioData(base64Audio);
                }
            },
            onclose: () => {
                callbacks.onClose();
            },
            onerror: (e) => {
                callbacks.onError(e);
            }
        }
    });
};

// New version with Transcription enabled
export const connectToSmartLiveSession = async (
    callbacks: LiveSessionCallbacks,
    systemInstruction: string,
    voiceName: string = 'Fenrir'
) => {
    if (!ai) throw new Error("AI service not initialized");
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } },
            },
            systemInstruction: systemInstruction,
            outputAudioTranscription: {} // Fixed: Pass empty object to enable transcription using default settings
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
                callbacks.onError(e);
            }
        }
    });
};
