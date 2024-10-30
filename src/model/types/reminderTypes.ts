type createReminderProps = {
  userId: string,
  guildId: string,
  channelId: string,
  time: number,
  now: number,
  content: string,
  interval: number,
  expires: number
}

export { createReminderProps }