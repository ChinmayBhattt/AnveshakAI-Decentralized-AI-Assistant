
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
    renderer: new TerminalRenderer()
});

export async function selectModel(geminiService) {
    const spinner = ora('Fetching available models...').start();
    let models = [];
    try {
        models = await geminiService.listModels();
        spinner.succeed('Models fetched.');
    } catch (error) {
        spinner.warn('Could not fetch models dynamically. Using default list.');
        models = ["gemini-1.5-flash", "gemini-pro"];
    }

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'model',
            message: 'Select a Gemini Model:',
            choices: models
        }
    ]);

    console.log(chalk.green(`\nSelected Model: ${chalk.bold(answer.model)}\n`));
    return answer.model;
}

export async function startChatLoop(geminiService, modelName) {

    const spinnerStart = ora('Initializing Chat...').start();
    let chatSession;
    try {
        chatSession = await geminiService.startChat(modelName);
        spinnerStart.succeed(chalk.green('Chat Initialized!'));
    } catch (error) {
        spinnerStart.fail(chalk.red('Failed to initialize chat.'));
        console.error(chalk.red(error.message));
        return;
    }

    console.log(chalk.dim('--------------------------------------------------'));
    console.log(chalk.dim('Type "exit" or "quit" to end the session.'));
    console.log(chalk.dim('--------------------------------------------------\n'));

    while (true) {
        // Main Loop
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'message',
                message: chalk.cyan('You >'),
            }
        ]);

        const input = answer.message.trim();

        if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
            console.log(chalk.yellow('\nGoodbye! AnveshakAI shutting down...'));
            process.exit(0);
        }

        if (!input) continue;

        const spinner = ora('AnveshakAI is thinking...').start();

        try {
            // Pass the chat session object to sendMessage
            const response = await geminiService.sendMessage(chatSession, input);
            spinner.stop();

            console.log(chalk.magenta('AnveshakAI >'));
            console.log(marked(response));
            console.log(''); // New line
        } catch (error) {
            spinner.fail(chalk.red('Error generating response.'));
            console.error(chalk.red(error.message));
        }
    }
}
