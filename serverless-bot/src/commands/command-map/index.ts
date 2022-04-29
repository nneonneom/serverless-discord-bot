import { SlashCommand } from '../enums'
import { Command } from '../models'
import { addSong } from './add-song.command'
import { createPlaylist } from './create-playlist.command'

interface CommandMap {
    [key: string]: Command
 }

export default {
    [SlashCommand.ADD_SONG]: addSong,
    [SlashCommand.CREATE_PLAYLIST]: createPlaylist
} as CommandMap