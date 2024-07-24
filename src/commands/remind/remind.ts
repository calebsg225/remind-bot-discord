import { SlashCommandBuilder } from "discord.js";
import SlashCommand from "../_interface/SlashCommand";

export const remind: SlashCommand = {
  path: `remind`,
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Create a reminder.')
    .setDMPermission(false)
    .addStringOption(option =>
      option.setName('time')
        .setDescription('The time (and optionally date) to set the reminder for')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('content')
        .setDescription('The message content to send')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('interval')
        .setDescription('Time to wait before repeating the reminder. Leave blank for one-shot reminder')
    )
    .addStringOption(option =>
      option.setName('expires')
        .setDescription('For repeating reminders, the time at which the reminder will stop repeating')
    )
    ,
    execute: async (interaction) => {
      const user = interaction.user;
      const options = interaction.options;
      const remindHandler = interaction.client.reminderHandler;

      const time = options.getString('time', true);
      const content = options.getString('content', true);
      const interval = options.getString('interval');
      const expires = options.getString('expires');

      remindHandler.createReminder(user.id, time, content, interval, expires);
    }
}