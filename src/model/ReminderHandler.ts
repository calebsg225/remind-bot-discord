import ReminderDatabaseHandler from "./ReminderDatabase";

class ReminderHandler {
  database: ReminderDatabaseHandler;
  constructor() {
    this.database = new ReminderDatabaseHandler();
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
    await this.database.createReminder(userId, guildId, channelId, time, now, content, interval, expires);
  }

  // look at current reminders
  viewReminders = () => {}

  // delete reminders
  deleteReminder = () => {}

  buildReminders = () => {}
}

export default ReminderHandler;