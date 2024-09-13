import { Command } from "@sapphire/framework";
import { ChannelType } from "discord.js";
import { RadioDatabase } from "../../utils/database";
import { RadioPlaybackSystem } from "../../utils/radiosystem";

export class ServerSetupCmd extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'serversetup',
            description:"Sets up voice channel for koolReceiver",
            fullCategory: ["guild"]
        })
    }

    public override registerApplicationCommands(registry: Command.Registry){
        registry.registerChatInputCommand((builder) => {
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addChannelOption((option) =>
                    option.setName('voicechannel')
                        .setDescription('Designated channel for playback')
                        .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option.setName('radiocode')
                        .setDescription('A specific radio station added from database')
                        .setRequired(true)
                )
        })
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        
    }
}