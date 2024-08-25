import { Client, VoiceBasedChannel } from "discord.js";
import { Listener } from "@sapphire/framework";
import { RadioPlaybackSystem } from "../../utils/radiosystem";
import config from '../../../config.json'

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready',
        })
    }

    public async run(client: Client){
        var guild = client.guilds.cache.get(config.serverId) || await client.guilds.fetch(config.serverId);
        var getVoiceChannel = client.channels.cache.get(config.voiceChannelId) as VoiceBasedChannel
        const radio = new RadioPlaybackSystem()

        radio.radioStart({
            voiceChannel: getVoiceChannel,
            guildId: guild.id,
            stream: config.stream,
            vol: config.volume
        })
    }
}