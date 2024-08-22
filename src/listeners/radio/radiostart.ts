import { Client, VoiceBasedChannel } from "discord.js";
import { AudioResource, VoiceConnection, NoSubscriberBehavior, AudioPlayerStatus, joinVoiceChannel, createAudioResource, createAudioPlayer } from "@discordjs/voice";
import { Listener } from "@sapphire/framework";
import config from '../../../config.json'

export class RadioReady extends Listener {
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
        radio({
            voiceChannel: getVoiceChannel,
            guildId: guild.id,
            stream: config.stream,
            vol: config.volume
        })
        async function radio({ voiceChannel, guildId, stream, vol }: {voiceChannel: VoiceBasedChannel, guildId: string, stream: string, vol: number}) {
            let Error = false;
            joinRadio(voiceChannel).catch(e => {return console.log(e)})
        
            async function joinRadio(voiceChannel: VoiceBasedChannel){
                const vc = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: guildId,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator
                })
                const radio = createAudioResource(stream, {
                    inlineVolume: true
                })
                player(radio, vc, vol)
            }
        
            async function player(audiostream: AudioResource, audioconnect: VoiceConnection, volume: number) {
                try{
                    let player = createAudioPlayer({ behaviors: {noSubscriber: NoSubscriberBehavior.Play} });
                    audiostream.volume?.setVolume(volume/100);
                    player.play(audiostream)
                    audioconnect.subscribe(player)
        
                    player.on(AudioPlayerStatus.Idle, async() => {
                        try{
                            player.stop()
                        } catch(e){ console.log(e) }
                        setTimeout(() => {
                            joinRadio(voiceChannel).catch(e => {return console.log(e)})
                        }, 9000);
                    });
                    player.on("error", async(e) => {
                        Error = true;
                        setTimeout(() => {
                            joinRadio(voiceChannel).then(() => {
                                Error = false;
                                console.log("player error")
                            }).catch(e => {return console.log(e)})
                        }, 9000);
                    })
                    setInterval(() => {
                        if(!Error) return;
                        setTimeout(() => {
                            joinRadio(voiceChannel).then(() => {
                                Error = false
                                console.log("err")
                            })
                        }, 20*60*1000);
                    });
                } catch (e) {
                    setTimeout(() => {
                        Error = true;
                        joinRadio(voiceChannel).then(() => {
                            Error = false
                            console.log("err")
                        })
                    }, 9000);
                }
                console.log(Error)
                setInterval(async () => {
                    if (!Error) return;
                    setTimeout(() => {
                        joinRadio(voiceChannel).then(() =>{
                            console.log("err")
                            Error = false
                        })
                    }, 20*60*1000)
                })
            }
        }
    }
}