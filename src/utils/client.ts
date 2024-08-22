import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { IntentArray, PartialArray } from "../variables/intentpartials";
import config from '../../config.json'
import { ActivityType, RoleFlagsBitField } from "discord.js";

export class RadioClient extends SapphireClient {
    public constructor() {
        super({
            intents: IntentArray,
            partials: PartialArray,
            defaultPrefix: config.prefix,
            presence: {
                status: "online",
                activities: [
                    {
                        name: "kf!ping",
                        type: ActivityType.Playing,
                    },
                ],
            },
            loadMessageCommandListeners: true,
            loadApplicationCommandRegistriesStatusListeners: false
        });
    }

    public override login(token?: string){
        return super.login(token)
    }
}