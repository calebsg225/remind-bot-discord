import { RemindGuilds, Reminders } from "../schema/reminder/reminderData";
import mongoose from "mongoose";
import { createReminderProps } from "./types/reminderTypes";

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

  getAllGuildData = async () => {
    return await RemindGuilds.find({});
  }

  // create reminder
  createReminder = async (reminderProps: createReminderProps) => {
    const { userId, guildId, channelId, time, now, content, interval, expires } = reminderProps;
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

    guildData.reminders.set(`${now}-${userId}`, newReminder);
    await guildData.save();
  }

  // view all reminders
  viewReminders = () => {}

  // delete reminder
  deleteReminder = async (guildId: string, reminderId: string) => {
    const guildData = await this.fetchGuildData(guildId);
    guildData.reminders.delete(reminderId);
    await guildData.save();
  }

  // change reminder
  updateReminder = () => {}
}

export default ReminderDatabaseHandler;