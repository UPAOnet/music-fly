/**
  * entry point for webpack
  */

function addIndex (directory) {
 return require('./js/' + directory + '/index.js');
};

angular.module('musicApp', []);

require('bootstrap-loader');
require('./assets/index.js');
require('./scss/styles.scss');


addIndex('music');
addIndex('navigation');
addIndex('animations');
addIndex('static');
