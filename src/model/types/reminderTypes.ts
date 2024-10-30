type CreateReminderProps = {
  userId: string,
  guildId: string,
  channelId: string,
  time: number,
  now: number,
  content: string,
  interval: number,
  expires: number
}

type DatabaseReminder = {
  dateSet?: number,
  dateEnd?: number,
  repeatInterval?: number,
  repeatEndDate?: number,
  userId?: string,
  channelId?: string,
  content?: string
}

export { CreateReminderProps, DatabaseReminder }