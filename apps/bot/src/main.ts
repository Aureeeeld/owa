// * Packages
import { Discord, On, Client } from "@typeit/discord";
import { Message } from "discord.js";
import "reflect-metadata";

// * Environment
import { environment } from "./environments/environment";

// * Discord Bot
@Discord
export class DiscordApp {
  private static _client: Client;
  private _prefix: string = "!";
  private _sayHelloMessage: string = "hello !";
  private _commandNotFoundMessage: string = "command not found...";

  static start() {
    this._client = new Client();
    this._client.login(environment.token, `${__dirname}/*Discord.ts`);
  }

  @On("message")
  async onMessage(message: Message, client: Client) {
    if (DiscordApp._client.user.id !== message.author.id) {
      if (message.content[0] === this._prefix) {
        const cmd = message.content.replace(this._prefix, "").toLowerCase();
        switch (cmd) {
          case "hello":
            message.reply(this._sayHelloMessage);
            break;
          default:
            message.reply(this._commandNotFoundMessage);
            break;
        }
      }
    }
  }
}

// * Start
DiscordApp.start();
