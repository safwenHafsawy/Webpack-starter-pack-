const { merge } = require("webpack-merge");
const commonConfigs = require("./commonConfigs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfigs, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      linkType: "text/css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
});
