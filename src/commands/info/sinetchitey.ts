import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class TestCmd extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'sinetchitey',
            aliases: ["userinfo", "whois"],
            description: 'User info',
            fullCategory: ["info"]
        })
    }

    public async messageRun(message: Message) {
        return await message.channel.send(`**SHEKI NAGBENTA NG PALAMIG SA TAPAT NG MNL48 THEATER**`)
    }
}