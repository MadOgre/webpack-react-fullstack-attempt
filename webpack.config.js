const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./assets/index.html"
});
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./assets/scss/global.scss", "./assets/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.[hash:10].js"
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    open: true,
    hot: true,
    port: 4000,
    proxy: {
      "/api/": "http://localhost:3000"
    },
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: "errors-only",
    contentBase: "./assets"
  },
  devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : false
};