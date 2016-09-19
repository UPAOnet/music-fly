// const webpackEnv = {test: true};
// const webpackConfig = require('./webpack.config');
// const fileGlob =  './client/src/**/*.test.js';

// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     frameworks: ['mocha', 'chai'],
//     files: [fileGlob],
//     preprocessors: {
//       fileGlob: ['webpack'],
//     },
//     webpack: webpackConfig,
//     webpackMiddleware: {noInfo: true},
//     reporters: ['progress', 'coverage'],
//     coverageReporter: {
//       reporters: [
//         {type: 'lcov', dir: 'coverage/', subdir: '.'},
//         {type: 'json', dir: 'coverage/', subdir: '.'},
//         {type: 'text-summary'},
//       ]
//     },
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: false,
//     browsers: ['Chrome'],
//     singleRun: false,
//     concurrency: Infinity
//   })
// }
