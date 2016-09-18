export interface MusicEvents {
  login: string;
  loginFailed: string;
  logout: string;
  songSelected: string;
  songPlay: string;
  songPause: string;
  newSearch: string;
  switchPlaylist: string;
  deletePlaylist: string;
  addSong: string;
  newPlaylist: string;
  nextSong: string;
  previousSong: string;
  featuredSearch: string;
  featuredPage: string;
}

export const MUSIC_EVENTS: MusicEvents = {
  // User log in 
  login: 'LOGIN_SUCCESSFUL',
  // Failed log in 
  loginFailed: 'LOGIN_FAILED',
  // User log out 
  logout: 'LOGOUT_SUCCESSFUL',
  // song is selected from a song list
  songSelected: 'SONG_SELECTED',
  // song is played
  songPlay: 'SONG_PLAY',
  // Song is paused
  songPause: 'SONG_PAUSE',
  // search is typed into a search bar
  newSearch: 'NEW_SEARCH',
  // user switches to a playlist view
  switchPlaylist: 'SWITCH_PLAYLIST',
  // user creates a playlist
  newPlaylist: 'NEW_PLAYLIST',
  // User deletes a playlist
  deletePlaylist: 'DELETE_PLAYLIST',
  // user adds a song to a playlist
  addSong: 'ADD_SONG_TO_PLAYLIST',
  // A song is switching to next one on list
  nextSong: 'NEXT_SONG',
  // A song is switching to previous one on list
  previousSong: 'PREVIOUS_SONG',
  // A search is made fomr the featured page
  featuredSearch: 'FEATURED_SEARCH',
  // Switch to featured page
  featuredPage: 'FEATURED_PAGE'
}