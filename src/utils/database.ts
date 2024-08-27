import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { User, UserMention, userMention } from "discord.js";

export class RadioDatabase {
  private db: any;
  constructor() {
    this.openDatabase();
  }

  private openDatabase() {
    open({
      filename: "../botdb.db",
      driver: sqlite3.Database,
    })
      .then((db) => {
        this.db = db;
        console.log("Database file opened.");
      })
      .catch((err) => {
        console.error("Error opening database:", err);
      });
  }

  public async addRadioStation(
    name: string,
    desc: string,
    stream: string,
    color: string
  ) {
    const query = `
          INSERT INTO radio_stations (name, description, stream_url, color)
          VALUES (?, ?, ?, ?)
        `;
    try {
      await this.db.run(query, [name, desc, stream, color]);
      console.log(`Radio station added: ${name}`);
    } catch (err) {
      console.error("Error adding radio station:", err);
    }
  }

  public async removeRadioStation(name?: string, radiocode?: string) {
    const query = `
          DELETE FROM radio_stations
          WHERE name = ? OR radiocode = ?
        `;
    try {
      await this.db.run(query, [name, radiocode]);
      console.log(`Radio station removed: ${name || radiocode}`);
    } catch (err) {
      console.error("Error removing radio station:", err);
    }
  }

  public async fetchRadioStation(name?: string, radiocode?: string) {
    const query = `
          SELECT * FROM radio_stations
          WHERE name = ? OR radiocode = ?
        `;
    try {
      const row = await this.db.get(query, [name, radiocode]);
      if (row) {
        console.log(`Radio station found: ${row.name}`);
        return row;
      } else {
        console.log(`Radio station not found: ${name || radiocode}`);
        return null;
      }
    } catch (err) {
      console.error("Error fetching radio station:", err);
    }
  }

  public async addGuild(
    guildId: string | number,
    textId: string | number,
    voiceId: string | number
  ) {
    const query = `
          INSERT INTO guilds (guild_id, text_channel_id, voice_channel_id)
          VALUES (?, ?, ?)
        `;
    try {
      await this.db.run(query, [guildId, textId, voiceId]);
      console.log(`Guild added: ${guildId}`);
    } catch (err) {
      console.error("Error adding guild:", err);
    }
  }

  public async removeGuild(guildId: string | number) {
    const query = `
          DELETE FROM guilds
          WHERE guild_id = ?
        `;
    try {
      await this.db.run(query, [guildId]);
      console.log(`Guild removed: ${guildId}`);
    } catch (err) {
      console.error("Error removing guild:", err);
    }
  }

  public async addOwner(userId: string, user?: User) {
    //
  }

  public async removeOwner(userId: string, user?: User) {
    //
  }
}