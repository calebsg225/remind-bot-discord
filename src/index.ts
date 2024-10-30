import { Client, GatewayIntentBits, Collection } from "discord.js";
import chalk from "chalk";
import { BotToken, DatabaseAddress } from "../config.json";

import listeners from "./listeners/listeners";

import mongoose from "mongoose";
import { globalCommands, devCommands } from "./commands/commands";
import ReminderHandler from "./model/ReminderHandler";
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

// reminder timers
client.reminders = new Collection;

// create reminder handler on client
client.reminderHandler = new ReminderHandler(client);

// create timeouts for existing reminders in database
client.reminderHandler.initiateReminderTimers();

// activate event listeners
listeners(client, connection);

// connect to database
(async () => {
  await connect(DatabaseAddress).catch(console.error);
})();

// start bot
client.login(BotToken);