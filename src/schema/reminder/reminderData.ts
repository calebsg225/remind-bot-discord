import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reminders = new Schema({
  dateSet: Date, // date when reminder was created
  dateEnd: Date, // current date to send reminder
  repeatInterval: Number, // time to wait before repeating the  reminder
  repeatEndDate: Date, // for repeating reminders, the time at which the reminder will stop repeating
  setBy: String, // user who created reminder
  content: String, // message to send at remind date(s)
}, {
  _id: false
});

const remindChannels = new Schema({
  reminders: { // key is date set concated to creators user id joined by '-' Ex. 230945823-51409826345078
    type: Map,
    of: reminders
  }
}, {
  _id: false
});

const remindGuilds = new Schema({
  _id: mongoose.Types.ObjectId,
  channels: { // key is channel id
    type: Map,
    of: remindChannels
  }
});

const RemindGuilds = model("RemindGuild", remindGuilds, "reminders");
const RemindChannels = model("RemindChannel", remindChannels);
const Reminders = model("reminder", reminders);

export { RemindGuilds, RemindChannels, Reminders };