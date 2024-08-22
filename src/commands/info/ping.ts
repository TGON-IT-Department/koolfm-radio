import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            aliases:["pickles"],
            description:"ping command 12345 with latency chuchu",
            fullCategory: ["info"]
        })
    }

    public async messageRun(message: Message) {
        return await message.channel.send(`${this.container.client.ws.ping} ms`)
    }
}