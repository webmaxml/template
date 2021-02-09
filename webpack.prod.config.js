const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [
            path.resolve(__dirname, 'src/hbs'),
            path.resolve(__dirname, 'src/components')
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/components/pages/home/home.hbs',
      hash: true,
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/fonts', to: 'fonts' }
      ]
    }),
    new ImageminPlugin({
      externalImages: {
        context: 'src',
        sources: glob.sync('src/img/**/*.*'),
        destination: 'dist',
        fileName: '[path][name].[ext]'
      },
      jpegtran: {
        progressive: true
      }
    })
  ]
}
