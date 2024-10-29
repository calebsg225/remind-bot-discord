import { RemindGuilds, Reminders } from "../schema/reminder/reminderData";
import mongoose from "mongoose";

class ReminderDatabaseHandler {
  constructor() {}

  // checks if a guild already exists in the database
  private isNewGuild = async (guildId: string): Promise<boolean> => {
    return !(await RemindGuilds.findOne({guildId: guildId}));
  }

  // create new guild
  private createGuild = async (guildId: string) => {
    await new RemindGuilds({
      _id: new mongoose.Types.ObjectId,
      guildId: guildId,
      reminders: new Map
    }).save().catch(console.error);
  }

  private fetchGuildData = async (guildId: string) => {
    return await RemindGuilds.findOne({guildId: guildId});
  }

  // create reminder
  createReminder = async (
    userId: string, 
    guildId: string, 
    channelId: string, 
    time: number,
    now: number,
    content: string, 
    interval?: number, 
    expires?: number
  ) => {
    // if guild data is not in database, add it
    if (await this.isNewGuild(guildId)) await this.createGuild(guildId);
    const guildData = await this.fetchGuildData(guildId);

    const newReminder = new Reminders({
      dateSet: now,
      dateEnd: now+time,
      repeatInterval: (interval ? interval : 0),
      repeatEndDate: (expires ? now+expires : 0),
      userId: userId,
      channelId: channelId,
      content: content
    });

    guildData.reminders.set(`${now + time}-${userId}`, newReminder);
    await guildData.save();
  }

  // view all reminders
  viewReminders = () => {}

  // delete reminder
  deleteReminder = () => {}

  // change reminder
  updateReminder = () => {}
}

export default ReminderDatabaseHandler;