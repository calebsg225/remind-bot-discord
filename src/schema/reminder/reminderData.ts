import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reminder = new Schema({
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
  reminders: {
    type: Map,
    of: reminder
  }
}, {
  _id: false
});

const remindGuilds = new Schema({
  _id: mongoose.Types.ObjectId,
  discordUserId: String,
  channels: {
    type: Map,
    of: remindChannels
  }
});