import { Client, EmbedData, TextChannel } from "discord.js";
import ReminderDatabaseHandler from "./ReminderDatabase";
import { createReminderProps } from "../types/reminderTypes";
import DJSHelpers from "../helpers/DJSHelpers";

class ReminderHandler {
  database: ReminderDatabaseHandler;
  djsHelpers: DJSHelpers;
  client: Client
  constructor(client: Client) {
    this.client = client;
    this.database = new ReminderDatabaseHandler();
    this.djsHelpers = new DJSHelpers();
  }

  private unitConvert = (int: number, unit: string): number => {
    let res = 0;
    switch(unit.charAt(0)) {
      case ('d'): // decades or days, priority goes to days
        res = int * 86400000 * (unit.length > 1 && unit.charAt(1) === 'e' ? 365 : 1);
        break;
      case ('y'): // years
        res = int * 31536000000;
        break;
      case ('m'): // months or minutes, priority goes to minutes
        res = int * 60000 * (unit.length > 1 && unit.charAt(1) === 'o' ? 43790.4 : 1);
        break;
      case ('w'): // weeks
        res = int * 604800000;
        break;
      case ('h'): // hours
        res = int * 3600000
        break;
      case ('s'): // seconds
        res = int * 1000
        break;
      default:
        break;
    }
    return res;
  }

  // parse inputed string into a single value
  parseTime = (input: string): number => {
    const splitInp = input.toLocaleLowerCase().replace(/\W/g, '').split(/([0-9]+)/);
    if (!splitInp[0].length) splitInp.shift();
    if (!splitInp[splitInp.length - 1]) splitInp.pop();
    let res = 0;
    let i = 0;
    while (i+1 < splitInp.length) {
      // i must be number, i+1 must be letters
      if (!+splitInp[i] || +splitInp[i+1]) {
        i++;
        continue;
      }
      res += this.unitConvert(+splitInp[i], splitInp[i+1]);
      i+=2;
    }
    return res;
  }

  // create new reminder
  createReminder = async (reminderProps: createReminderProps, embedData: EmbedData) => {
    await this.database.createReminder(reminderProps);
    const { userId, guildId, channelId, now, time, content } = reminderProps;
    this.addReminderTimeout(userId, guildId, channelId, now, time, content);
    return this.djsHelpers.embedGenerator(embedData);
  }

  private addReminderTimeout = (
    userId: string, 
    guildId: string, 
    channelId: string, 
    timeSet: number, 
    timeToNext: number,
    content: string
  ) => {
    const channel = this.client.channels.cache.get(channelId) as TextChannel;
    const reminderId = `${timeSet}-${userId}`;
    const timeoutId = setTimeout(async () => {
      channel.send(content);
      this.client.reminders.delete(reminderId);
      await this.database.deleteReminder(guildId, reminderId)
    }, timeToNext)
    this.client.reminders.set(reminderId, timeoutId + '');
  }

  /**
   * Creates timeouts for all existing reminders in all guilds, discarding 
   * reminders that are past due.
   */
  initiateReminderTimers = async () => {
    for (const guild of await this.database.getAllGuildData()) {
      for (const reminder of guild.reminders) {
        const { userId, channelId, dateSet, dateEnd, content } = reminder[1];
        this.addReminderTimeout(userId, guild.guildId, channelId, dateSet, dateEnd - dateSet, content);
      }
    }
  }

  // look at current reminders
  viewReminders = () => {}

  // delete reminders
  deleteReminder = () => {}

  buildReminders = () => {}
}

export default ReminderHandler;