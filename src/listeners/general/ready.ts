import { Client } from "discord.js";
import { Listener } from "@sapphire/framework";

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready',
        })
    }

    public run(client: Client){
        return console.log(`${client.user?.tag} is now online!`)
    }
}