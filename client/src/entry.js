/**
  * entry point for webpack
  */

import module from './app-config.ts';

// path for all main JS directories
function addIndex (directory) {
 return require('./js/' + directory + '/index.js');
};

require('bootstrap-loader');
require('./assets/index.js');
require('./scss/styles.scss');


addIndex('music');
addIndex('navigation');
addIndex('animations');
addIndex('static');
