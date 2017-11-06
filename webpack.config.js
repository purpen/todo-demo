const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/app/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './build',
    port: 8080,
    inline: true,
    historyApiFallback: false
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};