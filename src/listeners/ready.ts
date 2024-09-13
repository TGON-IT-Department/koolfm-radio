import { Client } from "discord.js";
import { Listener } from "@sapphire/framework";
import { RadioPlaybackSystem } from "../utils/radiosystem";

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: 'ready',
        })
    }

    public override run(client: Client){
        this.container.logger.info("koolFM bot is ready!")
        const radio = new RadioPlaybackSystem();
        radio.autoSystemStart();
    }
}