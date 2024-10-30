import { SlashCommandBuilder } from "discord.js";
import SlashCommand from "../_interface/SlashCommand";
import { createReminderProps } from "../../model/types/reminderTypes";

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
        .setAutocomplete(true)
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
    ),
  execute: async (interaction) => {
    const user = interaction.user;
    const channelId = interaction.channel.id;
    const options = interaction.options;
    const reminderHandler = interaction.client.reminderHandler;

    const now = Date.now();
    const timeValue = options.get('time', true).value;
    const content = options.getString('content', true);
    const interval = options.get('interval')?.value || '';
    const expires = options.get('expires')?.value || '';
    const time = !+timeValue ? reminderHandler.parseTime((typeof timeValue === 'string') ? timeValue : '') : timeValue;
    if (!+time) {
      return interaction.reply("Time could not be processed");
    }
    const reminderProps: createReminderProps = {
      userId: user.id,
      guildId: interaction.guild.id,
      channelId: channelId,
      time: +time,
      now: now,
      content: content,
      interval: +interval,
      expires: +expires
    }
    const embed = await reminderHandler.createReminder(reminderProps, {
      title: 'Reminder Created',
      description: `Reminder for <#${channelId}> set for <t:${Math.floor((+time+now)/1000)}:R>`,
      color: 0xFFE500
    });
    const reply = {
      embeds: [embed]
    }
    return interaction.reply(reply);
  }
  ,
  autocomplete: async (interaciton) => {
    const focusedValue = interaciton.options.getFocused();
    const reminderHandler = interaciton.client.reminderHandler;

    if (!focusedValue.length) {
      interaciton.respond([{name: "Start typing a time...", value: "now"}]);
      return;
    }

    const parsedTime = reminderHandler.parseTime(focusedValue);

    const response: {name: string, value: string} = {name: "", value: parsedTime + ''};
    if (parsedTime > 86400000) {
      response.name = `In approximately ${Math.floor(parsedTime/86400000)} days, ${(parsedTime % 86400000) / 3600000} hours`;
    } else if (parsedTime > 3600000) {
      response.name = `In approximately ${Math.floor(parsedTime/3600000)} hours, ${(parsedTime % 3600000) / 60000} minutes`;
    } else if (parsedTime > 60000) {
      response.name = `In approximately ${Math.floor(parsedTime/60000)} minutes`;
    } else {
      response.name = "Time is not recognized.";
      response.value = "now";
    }
    interaciton.respond([{ name: focusedValue, value: parsedTime + '' }, response ]);
  }
}