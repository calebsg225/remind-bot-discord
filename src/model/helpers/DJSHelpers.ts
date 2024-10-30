import { ActionRowBuilder, APIEmbedField, ButtonBuilder, ButtonStyle, EmbedBuilder, EmbedData } from "discord.js";
import { DatabaseReminder } from "../types/reminderTypes";

class DJSHelpers {
  color: number;
  constructor() {
    this.color = 0xFFE500;
  }

  /**
   * @param id button custom id
   * @param label what the button says
   * @param style style of the button
   * @returns a new button
   */
  makeButton = (id: string, label: string, style: ButtonStyle): ButtonBuilder => {
    return new ButtonBuilder()
      .setCustomId(id)
      .setLabel(label)
      .setStyle(style)
  }
  
  generateLookButtonRow = () => {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(...[
      this.makeButton('start', '<<', ButtonStyle.Primary),
      this.makeButton('left', '<', ButtonStyle.Secondary),
      this.makeButton('refresh', 'Refresh', ButtonStyle.Secondary),
      this.makeButton('right', '>', ButtonStyle.Secondary),
      this.makeButton('end', '>>', ButtonStyle.Primary),
    ]);
  }
  
  /**
   * @param EmbedData optional embed properties
   * @returns a new embed
   */
  generateBaseEmbed = ({ title, description }: EmbedData): EmbedBuilder => {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(this.color)
  }

  generateLookEmbed = (
    channelId: string, 
    reminders: DatabaseReminder[], 
    pageCount: number, 
    currentPage: number,
    remindersPerPage: number
  ): EmbedBuilder => {
    const description: string[] = [];
    for (const reminder of reminders.slice((currentPage-1)*remindersPerPage, (currentPage-1)*remindersPerPage + remindersPerPage)) {
      const { userId, dateEnd, content } = reminder;
      description.push(`- '${content}' *occurs next* <t:${Math.floor(dateEnd/1000)}:R> (set by <@${userId}>)`);
    }
    const embed = this.generateBaseEmbed({
      title: `Reminders on <#${channelId}>`,
      description: description.join('\n')
    });
    embed.setFooter({text: `Page ${currentPage} of ${pageCount}`});
    return embed;
  }
}

export default DJSHelpers;