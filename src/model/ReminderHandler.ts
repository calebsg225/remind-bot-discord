import ReminderDatabaseHandler from "./ReminderDatabase";

class ReminderHandler {
  database: ReminderDatabaseHandler;
  constructor() {
    this.database = new ReminderDatabaseHandler();
  }

  // create new reminder
  createReminder = (userId: string, time: string, content: string, interval?: string, expires?: string) => {
    
  }

  // look at current reminders
  viewReminders = () => {}

  // delete reminders
  deleteReminder = () => {}
}

export default ReminderHandler;