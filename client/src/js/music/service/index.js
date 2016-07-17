// require('./player-controls.service.js');
require('./sc-search.service.js');
require('./search-type.service.js');
require('./song-constructor.service.js');
require('./spotify-search.service.js');
require('./spotify-search.service.js');
require('./tabs.service.js');
require('./TrackList.service.js');

import {NumberConverter} from './NumberConverter.service.ts';
import {PlayerControls} from './PlayerControls.service.ts';
import {PlaylistsService} from './Playlists.service.ts';

angular.module('musicApp')
 .service('numberConverter', NumberConverter)
 .service('playerControls', PlayerControls)
 .service('playlistsService', PlaylistsService)