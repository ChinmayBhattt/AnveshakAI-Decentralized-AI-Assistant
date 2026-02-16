
import { GoogleGenerativeAI } from '@google/generative-ai';
import Conf from 'conf';

const config = new Conf({ projectName: 'anveshak-cli' });

export async function listModels() {
    const apiKey = config.get('GEMINI_API_KEY');
    if (!apiKey) {
        // Fallback if no key yet (shouldn't happen in flow)
        return fallbackModels();
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Dynamically listing models is the only way to be sure what the user has access to.
        // We filter for models that support 'generateContent'.
        const response = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).apiKey ?
            null : null; // Hacky check? No, let's use the real manager if exposed.

        // The SDK doesn't expose listModels directly on the instance in older versions, 
        // but in 0.21+ it might not be straightforward to just "list".
        // Actually, it does NOT have a global listModels method on the client instance in some versions.
        // We have to use the ModelManager or simply fetch via REST to be safe, as we did in debug.

        // Let's rely on a hybrid approach:
        // 1. Try to fetch via REST API to get the real list.
        // 2. If that fails, return the fallback list.

        const fetchResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!fetchResponse.ok) {
            console.error("Failed to fetch dynamic model list, using fallback.");
            return fallbackModels();
        }

        const data = await fetchResponse.json();
        if (data.models) {
            // Filter for models that support generateContent
            const available = data.models
                .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name.replace('models/', '')); // Remove 'models/' prefix

            if (available.length > 0) return available;
        }

        return fallbackModels();

    } catch (e) {
        console.error("Error listing models:", e);
        return fallbackModels();
    }
}

function fallbackModels() {
    return [
        "gemini-2.5-flash", // Confirmed working in Backend
        "gemini-1.5-flash",
        "gemini-2.0-flash-exp",
        "gemini-pro"
    ];
}

export async function startChat(modelName) {
    const apiKey = config.get('GEMINI_API_KEY');
    if (!apiKey) {
        throw new Error("API Key not found. Please restart the CLI.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    let chat;
    try {
        chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello system." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I am AnveshakAI. How can I help?" }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });
    } catch (error) {
        throw new Error(`Failed to start chat with ${modelName}: ${error.message}`);
    }

    return chat;
}

export async function sendMessage(chat, message) {
    try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        // Enhanced error handling
        if (error.message.includes('404')) {
            return `Error: Model not found (404). This usually means the model '${chat.model}' is not available for your API key or Region. Please try selecting a different model.`;
        }

        // Mock Mode Fallback for Invalid Key or Quota Limits
        if (error.message.includes('API_KEY_INVALID') || error.message.includes('400') || error.message.includes('429')) {
            return `[Mock Mode] ⚠️ API Key Error or Quota Exceeded.\n\nSince a valid Gemini API key was not detected, I am running in **Mock Mode**.\n\n🤖 **AnveshakAI**: Hello! I see you're testing the CLI. In a real scenario, this would be a response from Google Gemini. \n\nTo fix this: \n1. Get a key from https://aistudio.google.com/apikey\n2. Run 'rm -rf ~/Library/Preferences/anveshak-ai-nodejs/'\n3. Restart 'npm start'`;
        }

        return `Error: ${error.message}`;
    }
}
