//Concatenates all main index files from each directory.

function addIndex (directory) {
 return require('./js/' + directory + '/index.js');
};


require('./assets/index.js');
require('./templates/index.js');
require('./scss/styles.scss');
require('./js/music-app.module.js');

addIndex('music');
addIndex('navigation');
addIndex('animations');
