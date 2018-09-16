const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.config");

module.exports = merge.smart(commonConfig, {
  mode: "production",
  optimization: {
    minimizer: [new UglifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
});
