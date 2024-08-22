import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class RadioCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'radio',
            description:"",
            fullCategory: ["info"]
        })
    }

    public async messageRun(message: Message) {
        return await message.channel.send(`${this.container.client.ws.ping} ms`)
    }
}