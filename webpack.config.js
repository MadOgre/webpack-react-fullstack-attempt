const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./assets/index.html"
});
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin({
  filename: "[name].[hash:10].css",
  disable: process.env.NODE_ENV !== "production"
});

module.exports = {
  entry: {
    main: ["normalize.css", "./assets/scss/global.scss", "./assets/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.[hash:10].js"
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: extractCss.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            plugins: [autoprefixer()],
            sourceMap: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.HotModuleReplacementPlugin(),
    extractCss
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