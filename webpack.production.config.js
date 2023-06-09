const path = require("path"); //Cannot use ECMA script modules in this file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    'hello-world':"./src/hello-world.js",
    'matrix':"./src/matrix.js"
  },
  output: {
    filename: "[name].[contenthash].js", //Updates on changes only
    path: path.resolve(__dirname, "./dist"),
    //publicPath:'auto' //This happens behind the scenes with Webpack5
    publicPath: "",
    // clean:{ These are the only two properties
    //     dry:true, //webpack tells us which files will be removed
    //     keep: /\.css/ //tells webpack which files to keep
    // }
  },
  mode: "production",// none | development | production
  optimization:{
    splitChunks:{
      chunks: 'all',
      minSize: 3000, //3kb
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          // Webpack process loaders from right to left. Order matters
          MiniCssExtractPlugin.loader,
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
        use:[
            'handlebars-loader'
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      //Extract all css into a separate css file
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      filename:'hello-world.html',
      chunks: ['hello-world'],
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Hello World",
      minify:false //disable minification on html files
    }),
    new HtmlWebpackPlugin({ 
      filename:"matrix.html",
      chunks:['matrix'],
      title: "Matrix",
      template: "src/page-template.hbs",
      description: "Matrix",
      minify:false 
    }),
  ],
};
