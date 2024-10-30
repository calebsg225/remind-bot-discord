import { SimpleIdentifyThrottler, SlashCommandBuilder } from "discord.js";
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
    await interaction.deferReply();
    
    const reminderHandler = interaction.client.reminderHandler;
    
    const channel = interaction.options.getChannel('channel', true);

    const { pageCount, reply } = await reminderHandler.enterLookMode(interaction.guild.id, channel.id);

    if (!pageCount) {
      return interaction.editReply(`There are no reminders on <#${channel.id}>.`);
    }

    await interaction.editReply(reply);
  }
}