import { Command } from "../models"

export const addSong: Command = {
    name: 'add_song',
    execute: (): string => {
        console.log("Executing create playlist command...")
        return `
:fire: Command **${addSong.name}** has been received you dirty lil bitch... :fire: 
                       - Congrats on sending your command! -
                `
    }
} 

