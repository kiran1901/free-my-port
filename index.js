#!/usr/bin/env node

import { Command } from 'commander';
import kill from 'kill-port';
import chalk from 'chalk';
import ora from 'ora';
import detect from 'detect-port';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

const program = new Command();

program
    .version('1.2.0')
    .description('Free specified ports')
    .option('-p, --ports <ports>', 'Comma-separated list of ports or port ranges to free')
    .option('-c, --config <path>', 'Path to config file')
    .option('-i, --interactive', 'Interactive mode to select ports to free')
    .option('-r, --retry <retries>', 'Number of times to retry freeing ports', parseInt, 1)
    .parse(process.argv);

const options = program.opts();

const getPortsFromConfig = (configPath) => {
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return config.ports || [];
    } else {
        console.error(chalk.red(`Config file not found at ${configPath}`));
        process.exit(1);
    }
};

const getPortsFromOption = (portsOption) => {
    return portsOption.split(',').flatMap(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
        } else {
            return [Number(part)];
        }
    });
};

const promptForPorts = async () => {
    const availablePorts = Array.from({ length: 10000 }, (_, i) => i + 1); // Example: list all ports from 1 to 10000
    const { ports } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ports',
            message: 'Select ports to free:',
            choices: availablePorts.map(port => ({ name: String(port), value: port })),
        },
    ]);
    return ports;
};

const getPortUsage = async (port) => {
    try {
        const { stdout } = await execPromise(`lsof -i :${port}`);
        return stdout;
    } catch {
        return null;
    }
};

const freePort = async (port, retries) => {
    const spinner = ora(`Checking port ${port}`).start();

    const free = async (attempt) => {
        const detectedPort = await detect(port);
        if (detectedPort === port) {
            spinner.succeed(`Port ${port} is already free.`);
            console.log(chalk.green(`You can run your server on port ${port}, it is free now.`));
        } else {
            if (attempt > 0) {
                spinner.text = `Freeing port ${port} (attempt ${retries - attempt + 1})`;
                try {
                    await kill(port);
                    spinner.succeed(`Port ${port} is freed.`);
                    console.log(chalk.green(`You can run your server on port ${port}, it is free now.`));
                } catch (err) {
                    spinner.fail(`Failed to free port ${port}: ${err.message}`);
                    await free(attempt - 1);
                }
            } else {
                spinner.fail(`Failed to free port ${port} after ${retries} attempts.`);
            }
        }
    };

    const usage = await getPortUsage(port);
    if (usage) {
        console.log(chalk.yellow(`Port ${port} is currently in use by:\n${usage}`));
    }

    await free(retries);
};

const main = async () => {
    let ports = [];

    if (options.config) {
        const configPath = path.resolve(process.cwd(), options.config);
        ports = getPortsFromConfig(configPath);
    }

    if (options.ports) {
        ports = getPortsFromOption(options.ports);
    }

    if (options.interactive) {
        ports = await promptForPorts();
    }

    if (ports.length === 0) {
        console.error(chalk.red('Please specify ports to free using the -p option, a config file, or interactive mode.'));
        process.exit(1);
    }

    for (const port of ports) {
        await freePort(port, options.retry);
    }
};

main();
