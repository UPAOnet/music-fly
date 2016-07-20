/**
  * entry point for webpack
  */

import module from './app-config.ts';
SC.initialize({client_id: 'b10a9e77003de676a40bcd4ce7346f03'})
// path for all main JS directories
function addIndex (directory) {
 return require('./js/' + directory + '/index.js');
};

require('bootstrap-loader');
require('./assets/index.js');
require('./scss/styles.scss');


addIndex('music');
addIndex('navigation');
addIndex('routes');
addIndex('animations');
addIndex('static-components');
