import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";

export default interface SlashCommand {
  cooldown?: number;
  path: string,
  data: any,
  execute: (interaction: ChatInputCommandInteraction) => void
  autocomplete?: (interaction: AutocompleteInteraction) => void
}