// extend default discord.js classes

import { Collection } from "discord.js";
import SlashCommand from "../commands/_interface/SlashCommand";
import ReminderHandler from "../model/ReminderHandler";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommand>,
    cooldowns: Collection<string, Collection<string, number>>,
    reminderHandler: ReminderHandler
  }
}