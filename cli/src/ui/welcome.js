
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

export function showWelcome() {
    console.clear();

    // Header ASCII Art
    console.log(
        chalk.cyan(
            figlet.textSync('Anveshak-AI', { horizontalLayout: 'full' })
        )
    );

    // Welcome Message in Box
    const welcomeMessage = chalk.bold('Welcome to AnveshakAI - CLI Edition\n') +
        chalk.green('A Decentralized AI Assistant powered by Hackers Unity\n\n') +
        chalk.yellow('Features:\n') +
        '• Terminal-based interaction\n' +
        '• Secure API Key Management\n' +
        '• Multi-model Support\n' +
        '• Clean & Modular Design';

    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        backgroundColor: '#1e1e1e'
    };

    console.log(boxen(welcomeMessage, boxenOptions));
}
