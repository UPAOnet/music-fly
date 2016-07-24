export interface MusicEvents {
  songSelected: string;
  songPlay: string;
  newSearch: string;
  switchPlaylist: string;
  addSong: string;
  newPlaylist: string;
  nextSong: string;
  previousSong: string;
}

export const MUSIC_EVENTS: MusicEvents = {
  songSelected: 'SONG_SELECTED',
  songPlay: 'SONG_PLAY',
  newSearch: 'NEW_SEARCH',
  switchPlaylist: 'SWITCH_PLAYLIST',
  addSong: 'ADD_SONG_TO_PLAYLIST',
  newPlaylist: 'NEW_PLAYLIST',
  nextSong: 'NEXT_SONG',
  previousSong: 'PREVIOUS_SONG'
}