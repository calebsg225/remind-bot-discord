import { Client, GatewayIntentBits, Collection } from "discord.js";
import chalk from "chalk";
import { BotToken } from "../config.json";

import listeners from "./listeners/listeners";

import { globalCommands } from "./commands/commands";

console.log(chalk.yellow(`Bot is starting...`));

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// set online status to mobile
const {DefaultWebSocketManagerOptions} = require(`@discordjs/ws`);
DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord Android";

// mount commands to client
client.commands = globalCommands;

// command cooldowns
client.cooldowns = new Collection;

// activate event listeners
listeners(client);

// start bot
client.login(BotToken);