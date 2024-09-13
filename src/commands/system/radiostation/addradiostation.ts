import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { RadioDatabase } from "../../../utils/database";

export class AddRadioStationCmd extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "addradiostation",
            description:"Add radio station from the database",
            fullCategory: ["radio"]
        })
    }

    public override messageRun(message: Message) {
        return message.reply(`${this.container.client.ws.ping} ms`)
    }
}