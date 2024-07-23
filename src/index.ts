import { Client, GatewayIntentBits, Collection } from "discord.js";
import chalk from "chalk";
import { BotToken, DatabaseAddress } from "../config.json";

import listeners from "./listeners/listeners";

import mongoose from "mongoose";
import { globalCommands, devCommands } from "./commands/commands";
const { connect, connection } = mongoose;

console.log(chalk.yellow(`Bot is starting...`));

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// set online status to mobile
const {DefaultWebSocketManagerOptions} = require(`@discordjs/ws`);
DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord Android";

// mount commands to client
client.commands = globalCommands.concat(devCommands);

// command cooldowns
client.cooldowns = new Collection;

// activate event listeners
listeners(client, connection);

// connect to database
(async () => {
  await connect(DatabaseAddress).catch(console.error);
})();

// start bot
client.login(BotToken);