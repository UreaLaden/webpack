const path = require("path"); //Cannot use ECMA script modules in this file
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", //Updates on changes only
    path: path.resolve(__dirname, "./dist"),
    //publicPath:'auto' //This happens behind the scenes with Webpack5
    publicPath: "",
    // clean:{ These are the only two properties
    //     dry:true, //webpack tells us which files will be removed
    //     keep: /\.css/ //tells webpack which files to keep
    // }
  },
  mode: "development", // none | development | production
  devServer:{
    port:9000,
    static:{
        directory:path.resolve(__dirname, "./dist"),
    },
    devMiddleware:{
        index:'index.html',
        writeToDisk: true //Write files to the dist folder
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/, //Does the file contain png or jpg
        type: "asset", //asset/resource, asset/inline,asset/source,asset
        parser: {
          dataUrlCondition: {
            // asset/inline < 3 > asset/resource
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source", // Webpack reads text file in as js string
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          // Webpack process loaders from right to left. Order matters
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //Except those located in this folder
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello world",
      template: "src/index.hbs",
      description: "Some description",
    }),
  ],
};
