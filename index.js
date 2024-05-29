#!/usr/bin/env node

import { Command } from 'commander';
import kill from 'kill-port';
import chalk from 'chalk';
import ora from 'ora';
import detect from 'detect-port';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

program
    .version('1.1.0')
    .description('Free a specified port')
    .option('-p, --port <port>', 'Port to free')
    .option('-c, --config <path>', 'Path to config file')
    .parse(process.argv);

const options = program.opts();

let port = options.port;

if (options.config) {
    const configPath = path.resolve(process.cwd(), options.config);
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        port = config.port;
    } else {
        console.error(chalk.red(`Config file not found at ${configPath}`));
        process.exit(1);
    }
}

if (!port) {
    console.error(chalk.red('Please specify a port to free using the -p option or provide a config file.'));
    process.exit(1);
}

const spinner = ora(`Checking port ${port}`).start();

detect(port)
    .then(_port => {
        if (_port === port) {
            spinner.succeed(`Port ${port} is already free.`);
            console.log(chalk.green(`You can run your server on port ${port}, it is free now.`));
        } else {
            spinner.text = `Freeing port ${port}`;
            return kill(port)
                .then(() => {
                    spinner.succeed(`Port ${port} is freed.`);
                    console.log(chalk.green(`You can run your server on port ${port}, it is free now.`));
                })
                .catch((err) => {
                    spinner.fail(`Failed to free port ${port}: ${err.message}`);
                });
        }
    })
    .catch((err) => {
        spinner.fail(`Error checking port ${port}: ${err.message}`);
    });
