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
  // resolve: {
  //   extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  // },
  module: {
   loaders: [
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
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
      loader: 'html-loader'
    },
    // {
    //   test: /\.html$/,
    //   loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './client/src')) + '/!html'
    //   // loader: 'ngtemplate?relativeTo=/templates/!html'
    // },
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
  plugins: debug ? [] : [
    new CopyWebpackPlugin([{ from: 'assets' }]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
