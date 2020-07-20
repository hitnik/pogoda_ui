
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use:{
          loader: 'url-loader?limit=100000'
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon/favicon.png"
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      WEATHER_API_HOST_DEV: JSON.stringify('http://192.168.99.100:8000'),
      WEATHER_API_SCHEMA_DEV: JSON.stringify('swagger.json')
    })
  ]
};