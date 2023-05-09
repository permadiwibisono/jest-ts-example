/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const hot = process.argv.filter((argv) => argv === "serve").length > 0;

const outDir = path.resolve(__dirname, "dist");

let mode = "development";
let target = "web";
let PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

let plugins = [
  new MiniCssExtractPlugin({
    filename: mode === "development" && hot ? "[name].css" : "[name].[contenthash:8].css",
    chunkFilename: mode === "development" && hot ? "[id].css" : "[id].[contenthash:8].css"
  }),
  new CopyWebpackPlugin({
    patterns: [{from: "./src/static", to: outDir}]
  }),
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  })
];

if (hot) {
  plugins = [...plugins, new ReactRefreshWebpackPlugin()];
}

module.exports = {
  mode,
  entry: path.join(__dirname, "src/index.tsx"),
  target,

  output: {
    filename: "[name].[contenthash:8].js",
    path: outDir,
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024 // reach max size until 30kb
          }
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        include: /\.module\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportLocalsConvention: "camelCaseOnly"
              }
            }
          },
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        exclude: /\.module\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [mode === "development" && hot && require.resolve("react-refresh/babel")].filter(Boolean),
            cacheDirectory: true
          }
        }
      }
    ]
  },

  plugins,

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@containers": path.resolve(__dirname, "src/containers/")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  devtool: mode === "development" ? "inline-source-map" : "source-map",
  devServer: {
    static: {
      directory: outDir
    },
    hot,
    compress: true,
    port: PORT
  }
};
