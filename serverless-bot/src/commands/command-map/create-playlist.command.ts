import { Command } from "../models"

export const createPlaylist: Command = {
    name: 'create_playlist',
    execute: (): string => {
        console.log("Executing create playlist command...")
        return `
:fire: Command **${createPlaylist.name}** has been received you dirty lil bitch... :fire: 
                       - Congrats on sending your command! -
                `
    }
} 


