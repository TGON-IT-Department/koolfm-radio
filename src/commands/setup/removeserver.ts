import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { RadioDatabase } from "../../utils/database";
import { RadioPlaybackSystem } from "../../utils/radiosystem";

export class ResetSetupCmd extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'resetsetup',
            description:"Reset settings and disconnects voice channel",
            fullCategory: ["guild"]
        })
    }

    public override registerApplicationCommands(registry: Command.Registry){
        registry.registerChatInputCommand((builder) => {
            builder
                .setName(this.name)
                .setDescription(this.description)
        })
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        
    }
}