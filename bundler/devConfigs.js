const path = require("path");
const { merge } = require("webpack-merge");
const commonConfigs = require("./commonConfigs");

module.exports = merge(commonConfigs, {
  mode: "development",
  stats: "errors-warnings",
  devServer: {
    port: 3000,
    open: true,
    hot: false,
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    static: {
      watch: true,
      directory: path.resolve(__dirname, "static"),
    },

    setupMiddlewares: function (middlewares, devServer) {
      console.clear();
      console.log(
        "-------------------------------------------------------------------"
      );
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const domain = `http${https}://localhost:${port}`;
      console.log(`Project running at:\n ${domain}`);
      console.log(
        "-------------------------------------------------------------------"
      );
      return middlewares;
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
