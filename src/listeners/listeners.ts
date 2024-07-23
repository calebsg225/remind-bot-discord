import { Client } from "discord.js";

// discord events
import { ready } from "./discord/ready";
import { interactionCreate } from "./discord/interactionCreate";

const discordEvents = [
  ready, interactionCreate
];

// run all event listeners
export default (client: Client) => {
  // discord events
  for (const event of discordEvents) {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}