import sqlite3 from "sqlite3";
import { open } from 'sqlite'

// export async function openDb() {
//     return open({
//         filename: '../botdb.db',
//         driver: sqlite3.Database
//     }).then((db) => {
//         console.log('The database is opened.')
//     })
// }

// all functions below are only reserved for SQL data entry, not works by discord.js

export async function addRadioStation(name: string, desc: string, stream: string, color: string){
    // add radio station entry
    // station name, desc, shoutcast stream, color code (string regex)
    // for example: addRadioStation("SVC BINI Radio", "OT8", "rtmp.svciplay.com/bini.mp3", "#ee7cdb")
}

export async function removeRadioStation(name?: string, radiocode?: string){
    // remove radio station entry; must be the exact name
}

export async function fetchRadioStation(name?: string, radiocode?: string){
    // obtain online radio station details 
}

export async function addGuild(guildId: string | number, textId: string | number, voiceId: string | number) {
    // adds server to database after discord.js interaction
}

export async function removeGuild(guildid: string | number) {
    // removes server from database after autodisconnect
}