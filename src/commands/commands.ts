import { Collection } from "discord.js";
import SlashCommand from "./_interface/SlashCommand";

// global commands
import { remind } from './remind/remind';
import { look } from './management/look';

// util commands
import { reload } from "./utils/reload";
import { ping } from "./utils/ping";

// create global commands collection to be mounted to client
const globalCommands = new Collection<string, SlashCommand>()
  .set(remind.data.name, remind)
  .set(look.data.name, look)

// create dev commands collection
const devCommands = new Collection<string, SlashCommand>()
  .set(reload.data.name, reload)
  .set(ping.data.name, ping)

export { globalCommands, devCommands};