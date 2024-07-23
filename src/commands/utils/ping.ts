import { SlashCommandBuilder } from "discord.js";
import SlashCommand from "../_interface/SlashCommand";

export const ping: SlashCommand = {
  path: "utils",
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`sends pong`)
  ,
  execute: async (interaction) => {
    return interaction.reply({
      content: 'pong!',
      ephemeral: true
    });
  }
}