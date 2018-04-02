const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./assets/index.html"
});
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./assets/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.[hash:10].js"
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