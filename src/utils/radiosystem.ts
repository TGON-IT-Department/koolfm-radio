import { VoiceBasedChannel } from "discord.js";
import { AudioPlayerStatus, AudioResource, VoiceConnection, NoSubscriberBehavior, joinVoiceChannel, createAudioResource, createAudioPlayer, getVoiceConnection } from "@discordjs/voice";

export class RadioPlaybackSystem {
    public RadioPlaybackSystem(){}
    // Parameter values will be used to start the engine per server.
    public radioStart({ voiceChannel, guildId, stream, vol }: {voiceChannel: VoiceBasedChannel, guildId: string, stream: string, vol: number}) {
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
                    await idleWake();
                });
                player.on("error", async(e) => { await playerError() })
                genError();
            } catch (e) { await genCatchError() }
            console.log(Error)
            await genError();
        }
    
        async function playerError(){
            Error = true;
            setTimeout(() => {
                joinRadio(voiceChannel).then(() => {
                    Error = false;
                    console.log("player error")
                }).catch(e => {return console.log(e)})
            }, 9000);
        }
    
        async function genError(){
            setInterval(() => {
                if(!Error) return;
                setTimeout(() => {
                    joinRadio(voiceChannel).then(() => {
                        Error = false
                        console.log("err")
                    })
                }, 20*60*1000);
            });
        }
    
        async function genCatchError(){
            setTimeout(() => {
                Error = true;
                joinRadio(voiceChannel).then(() => {
                    Error = false
                    console.log("err")
                })
            }, 9000);
        }
    
        async function idleWake(){
            setTimeout(() => {
                joinRadio(voiceChannel).catch(e => {return console.log(e)})
            }, 9000);
        }
    }

    // must instantiate a voice connection through message/interaction
    public radioStop({ voiceCon }:  {voiceCon: string}){
        const connection = getVoiceConnection(voiceCon);
        connection?.destroy();
    }
}