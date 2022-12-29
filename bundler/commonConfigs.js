const path = require("path"); //used by webpack to handle folders
const HTMLPlugin = require("html-webpack-plugin");

//this is the main configs object, in it you write different options and tell webpack what to do
module.exports = {
  //path to the entry point. From that file webpack wil begin its work
  entry: "./src/index.js",

  //path and filename of the the result bundle
  //webpack will bundle all js into the output file
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "main.[contenthash].js",
    clean: true,
  },
  //loaders are one of the main features of webpack
  //they are used to apply certain transformation to the code
  module: {
    rules: [
      {
        test: /.js$/, //for file extension which will be transformed (javascript in this case)
        exclude: "/(node_modules)/", //tells webpack which path should be ignored when transforming modules
        use: {
          //here we set the loader which will be applied to files that match test regex
          loader: "babel-loader", // used to transform the modern js code to browser compatible js before bundling it
          options: {
            // vary according to the loader
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  //the plugins are used to do anything the loaders can't do
  plugins: [
    //HtmlWebpackPlugin will generate an HTML file you using the bundled js files
    //which simplifies creation of HTML files to serve your webpack bundles
    new HTMLPlugin({
      title: "Page Title",
      filename: "index.html",
      template: "./src/template.html",
      minify: {
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
      },
    }),
  ],
};
