
import inquirer from 'inquirer';
import Conf from 'conf';
import chalk from 'chalk';
import ora from 'ora';
import { GoogleGenerativeAI } from '@google/generative-ai';

const config = new Conf({ projectName: 'anveshak-cli' });

export async function getApiKey() {
    // User requested to ALWAYS ask for the API key first.
    // We clear the saved key to force the prompt.
    config.delete('GEMINI_API_KEY');

    // Ask for new key
    const answer = await inquirer.prompt([
        {
            type: 'password',
            name: 'apiKey',
            message: 'Enter your Gemini API Key:',
            mask: '*',
            validate: async (input) => {
                if (!input) return 'API Key is required';
                return true;
            }
        }
    ]);

    const spinner = ora('Verifying API Key...').start();

    // Soft validation
    const checkResult = await validateApiKey(answer.apiKey);

    if (checkResult === true) {
        spinner.succeed(chalk.green('API Key verified successfully!'));
    } else {
        spinner.warn(chalk.yellow('Warning: Could not verify key with standard models.'));
        console.log(chalk.dim(`Details: ${checkResult}`));
        console.log(chalk.green('Proceeding anyway...'));
    }

    config.set('GEMINI_API_KEY', answer.apiKey);
    return answer.apiKey;
}

async function validateApiKey(key) {
    const cleanKey = key.trim();
    if (!cleanKey) return "API Key cannot be empty";

    const genAI = new GoogleGenerativeAI(cleanKey);
    // Use the model explicitly used in the backend (lib.rs)
    const modelsToTry = ["gemini-2.5-flash"];

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            await model.generateContent("Hi");
            return true;
        } catch (error) {
            if (error.message && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
                return "API_KEY_INVALID";
            }
        }
    }
    return "Connection/Model Error (404)";
}
