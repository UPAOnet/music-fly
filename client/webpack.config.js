var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = {
  context: __dirname + '/src',
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/dev-server",
      "./entry.js"
    ],
  output: {
    path: __dirname + "/dev/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "/client/dev/public",
    noInfo: true,
    inline: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:9292/',
        secure: false,
        changeOrigin: true
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
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
   ],
  },
  devtool: "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
