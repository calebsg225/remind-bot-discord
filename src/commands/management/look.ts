import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../_interface/SlashCommand";

export const look: SlashCommand = {
  path: `management`,
  data: new SlashCommandBuilder()
    .setName('look')
    .setDescription(`View reminders on specific channel.`)
    .setDMPermission(false)
    .addChannelOption(option => 
      option.setName('channel')
        .setDescription('The channel to view reminders on')
        .setRequired(true)
    )
  ,
  execute: async (interaction) => {
    const user = interaction.user;

  }
}