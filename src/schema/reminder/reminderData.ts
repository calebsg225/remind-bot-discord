import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reminders = new Schema({
  dateSet: Number, // date when reminder was created
  dateEnd: Number, // current date to send reminder
  repeatInterval: Number, // time to wait before repeating the  reminder
  repeatEndDate: Number, // for repeating reminders, the time at which the reminder will stop repeating
  userId: String, // user id of user who created reminder
  channelId: String, // channel id of channel to send message to
  content: String, // message to send at remind date(s)
}, {
  _id: false
});

const remindGuilds = new Schema({
  _id: mongoose.Types.ObjectId,
  guildId: String,
  reminders: { // key is date set concated to creators user id joined by '-' Ex. 230945823-51409826345078
    type: Map,
    of: reminders
  }
});

const RemindGuilds = model("RemindGuild", remindGuilds, "reminders");
const Reminders = model("reminder", reminders);

export { RemindGuilds, Reminders };