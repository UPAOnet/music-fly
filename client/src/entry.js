//Concatenates all main index files from each directory.

function addIndex (directory) {
 return require('./js/' + directory + '/index.js');
};

angular.module('musicApp', []);

require('./assets/index.js');
require('./scss/styles.scss');

addIndex('music');
addIndex('navigation');
addIndex('animations');
