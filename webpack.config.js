var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = {
  context: __dirname + '/client/src',
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./entry.js",
  output: {
    path: __dirname + "/client/dev/public",
    filename: "scripts.min.js"
  },
  module: {
   loaders: [
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
     test: /\.woff$/,
     loader: "url-loader?limit=10000&åimetype=application/font-woff&name=[path][name].[ext]"
    },
    {
     test: /\.woff2$/,
     loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    },
    {
     test: /\.(eot|ttf|svg|gif|png|jpg)$/,
     loader: 'file-loader?name=[path][name].[ext]'
   },

    {
      test: /\.ts$/,
      loader: 'ts'
    },
    {
      test: /\.js?$/,
      loader: 'ng-annotate'
    },
    {
      test: /\.html$/,
      // loader: 'html-loader'
      loader: 'file-loader?name=[path][name].[ext]'
    },
    {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-0"],
      }
    }
   ]
  },
  // plugins: debug ? [] : [
  //   new CopyWebpackPlugin([{ from: 'assets' }]),
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  // ],
  plugins: [
    new CopyWebpackPlugin([{ from: 'assets' }]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};
