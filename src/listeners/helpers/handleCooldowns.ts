import { ChatInputCommandInteraction, Collection } from "discord.js";
import SlashCommand from "../../commands/_interface/SlashCommand";

class HandleCooldowns {
  private defaultCooldownSeconds: number;
  constructor() {
    this.defaultCooldownSeconds = 3;
  }
  createCooldown = (interaction: ChatInputCommandInteraction) => {
    const command = interaction.client.commands.get(interaction.commandName);
    const { cooldowns } = interaction.client;
    const commandName = command.data.name;
    const user = interaction.user;

    // create a new collection of user cooldowns for a specific command if it doesn't exist
    if (!cooldowns.has(commandName)) {
      cooldowns.set(commandName, new Collection());
    }

    const now = Date.now();

    // get the collection of users with an active cooldown for the command
    const timestamps = cooldowns.get(commandName);

    // set cooldown amount
    const cooldownAmount = (command.cooldown ?? this.defaultCooldownSeconds) * 1000;


    if (timestamps.has(user.id)) {
      const expirationTime = timestamps.get(user.id) + cooldownAmount;
      return interaction.reply({
        content: `I can't keep up! Please wait <t:${Math.round(expirationTime / 1000)}:R>`,
        ephemeral: true
      }).then(msg => {
        setTimeout(() => msg.delete(), expirationTime - now);
      });
    }

    timestamps.set(user.id, now);
    setTimeout(() => timestamps.delete(user.id), cooldownAmount);

    return false;
  }


}


export default new HandleCooldowns;