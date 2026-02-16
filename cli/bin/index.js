#!/usr/bin/env node

import { showWelcome } from '../src/ui/welcome.js';
import { getApiKey } from '../src/auth/apiKey.js';
import * as geminiService from '../src/services/gemini.js';
import { selectModel, startChatLoop } from '../src/ui/chat.js';

async function main() {
    try {
        // 1. Welcome Screen
        showWelcome();

        // 2. Authentication
        // getApiKey now handles config setting internally
        await getApiKey();

        // 3. Model Selection
        // Pass the service module which contains listModels
        const selectedModel = await selectModel(geminiService);

        // 4. Start Chat
        // Pass the service module and selected model
        await startChatLoop(geminiService, selectedModel);

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        process.exit(1);
    }
}

main();
