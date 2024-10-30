import { ButtonBuilder, ButtonStyle, EmbedBuilder, EmbedData } from "discord.js";

class DJSHelpers {
  constructor() {}

  /**
   * @param id button custom id
   * @param label what the button says
   * @param style style of the button
   * @returns a new button
   */
  private makeButton = (id: string, label: string, style: ButtonStyle) => {
    return new ButtonBuilder()
      .setCustomId(id)
      .setLabel(label)
      .setStyle(style)
  }
  
  buttonRowGenerator = () => {
  }
  
  /**
   * @param EmbedData optional embed properties
   * @returns a new embed
   */
  embedGenerator = ({ title, description, color }: EmbedData): EmbedBuilder => {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
  }
}

export default DJSHelpers;