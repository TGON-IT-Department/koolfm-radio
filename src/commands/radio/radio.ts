import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class RadioCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'radio',
            description:"",
            fullCategory: ["radio"]
        })
    }

    public async messageRun(message: Message) {
        
    }
}