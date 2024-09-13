const sqlite3 = require('sqlite3').verbose();
import config from "../../config.json"

export class RadioDatabase {
  private db = new sqlite3.Database(config.dbfile, (err: any) => {
    console.error('Error connecting to the database:', err);
  })

  // radio stations
  public async addRadioStation(
    name: string,
    radiocode: string,
    desc: string,
    logo: string,
    stream: string,
  ) {
    this.db.serialize(() => {
      const query = `
        CREATE TABLE IF NOT EXISTS radio_stations (
          name TEXT,
          code TEXT PRIMARY KEY,
          description TEXT,
          logo TEXT,
          stream_url TEXT,
        ); 
        INSERT INTO radio_stations (name, code, description, logo, stream_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [name, radiocode, desc, logo, stream];
      this.db.run(query, params, (error: any) => {
        if(error){
          this.db.run('ROLLBACK');
          console.error(error); 
        }
        else {
          this.db.run('COMMIT');
          console.log(`Radio station added`);
        }
      })
    })
  }

  public async removeRadioStation(radiocode: string) {
    this.db.serialize(() => {
      const query = `
      DELETE FROM radio_stations
      WHERE code = ?
      `
      const params = [radiocode]
      this.db.run(query, params, (error: any) => {
        if(error) {
          this.db.run('ROLLBACK');
          console.error(error)
        } else {
          this.db.run('COMMIT');
          console.log(`Radio station "${radiocode}" removed`);
        }
      });
    })
  }

  public async getRadioStation(radiocode?: string): Promise<any> {
    const stations = await this.getAllRadioStations();
    if (radiocode) {
      return await stations.find((radio: any) => radio.code === radiocode);
    }
  }
  
  public async getAllRadioStations(): Promise<any[]> {
    const query = `SELECT * FROM radio_stations`;
    let radio: any[] = [];
    return new Promise((resolve, reject) => {
      this.db.all(query, (error: any, rows: any) => {
        if (error) {
          if (error.code === 'SQLITE_ERROR' && error.message.includes('no such table')) {
            // Table does not exist, handle accordingly
            console.error(`Table 'radio_stations' does not exist`);
            resolve([]); // or throw a custom error
          } else {
            console.error('Error occurred:', error.message);
            reject(error);
          }
        } else {
          rows.forEach((row: any) => {
            radio.push(row);
          });
          resolve(radio);
        }
      });
    });
  }

  // server guilds
  public async addGuild(
    guildId: string | number,
    voiceId: string | number,
    streamcode: string | number
  ) {
    const query = `
      CREATE TABLE IF NOT EXISTS guilds (
        guild_id INTEGER PRIMARY KEY,
        voice_channel_id INTEGER,
      );
      INSERT INTO guilds (guild_id, voice_channel_id, streamcode)
      VALUES (?, ?, ?)
    `;
    const params = [guildId, voiceId, streamcode];
    this.db.run(query, params, (error: any) => {
      if(error){
        this.db.run('ROLLBACK');
        console.error(error); 
      }
      else {
        this.db.run('COMMIT');
        console.log(`Guild "${guildId}" added`);
      }
    })
  }

  public async removeGuild(guildId: string | number) {
    const query = `
      DELETE FROM guilds
      WHERE guild_id = ?
    `;
    const params = [guildId];
    this.db.run(query, params, (error: any) => {
      if(error){
        this.db.run('ROLLBACK');
        console.error(error); 
      }
      else {
        this.db.run('COMMIT');
        console.log(`Guild "${guildId}" removed`);
      }
    })
  }

  public async getGuild(guildId: string | number): Promise<any[]> {
    const guilds = await this.getAllGuilds();
    if (guildId) {
      return await guilds.find((guild: any) => guild.guild_id === guildId);
    }
    return [""];
  }

  public async getAllGuilds(): Promise<any[]> {
    const query = `SELECT * FROM radio_stations`;
    let guilds: any[] = [];
    return new Promise((resolve, reject) => {
      this.db.all(query, (error: any, rows: any) => {
        if (error) {
          if (error.code === 'SQLITE_ERROR' && error.message.includes('no such table')) {
            // Table does not exist, handle accordingly
            console.error(`Table 'guilds' does not exist`);
            resolve([]); // or throw a custom error
          } else {
            console.error('Error occurred:', error.message);
            reject(error);
          }
        } else {
          rows.forEach((row: any) => {
            guilds.push(row);
          });
          resolve(guilds);
        }
      });
    });
  }

  // bot owners
  public async addOwner(userId: string, username: string) {
    const query = `
    CREATE TABLE IF NOT EXISTS bot_owners (
      id INTEGER PRIMARY KEY,
      name TEXT,
    );
    INSERT INTO bot_owners (name, id)
    VALUES (?, ?)
    `;
    const params = [userId, username];
    this.db.run(query, params, (error: any) => {
      if(error){
        this.db.run('ROLLBACK');
        console.error(error); 
      }
      else {
        this.db.run('COMMIT');
        console.log(`Bot owner "${username}" added`);
      }
    })
  }

  public async removeOwner(userId: string) {
    const query = `
    DELETE FROM bot_owners
    WHERE id = ?
    `
    const params = [userId];
    this.db.run(query, params, (error: any) => {
      if(error){
        this.db.run('ROLLBACK');
        console.error(error); 
      }
      else {
        this.db.run('COMMIT');
        console.log(`Bot owner "${userId}" added`);
      }
    })
  }
}