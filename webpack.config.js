const WebpackSourceMapSupport = require("webpack-source-map-support");
const WebpackNodeExternals = require("webpack-node-externals");
const {resolve} = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  externals: [
    new WebpackNodeExternals(),
  ],
  plugins: [
    new WebpackSourceMapSupport(),
  ],
  output: {
    path: resolve("dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
    ],
    modules: [
      resolve("node_modules"),
      resolve("src"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                [
                  "@babel/preset-typescript",
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
              plugins: [
                "macros",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-optional-chaining",
              ],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "less-loader",
          },
        ],
      },
    ],
  },
  entry: {
    "components/index": resolve("src", "core", "components", "index.ts"),
    "config/index": resolve("src", "core", "config", "index.ts"),
    "filters/index": resolve("src", "core", "filters", "index.ts"),
    "helpers/index": resolve("src", "core", "helpers", "index.ts"),
    "hooks/index": resolve("src", "core", "hooks", "index.ts"),
    "layouts/index": resolve("src", "core", "layouts", "index.ts"),
    "models/index": resolve("src", "core", "models", "index.ts"),
    "repositories/index": resolve("src", "core", "repositories", "index.ts"),
    "types/index": resolve("src", "core", "types", "index.ts"),
    "index": resolve("src", "core", "index.ts"),
  },
};
