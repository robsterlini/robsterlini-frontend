const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// import { IMAGES } from './src/js/images.js';

module.exports = {
  entry: `./src/index.js`,
  devtool: `inline-source-map`,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Rob Sterlini-Aitchison',
      template: 'src/index.html',
      meta: {
        description: `Lorem ipsum`,
      },
      contact: {
        'hi@robsterlini.co.uk': `mailto:hi@robsterlini.co.uk`,
        'Twitter': `https://twitter.com/robsterlini`,
        'Instagram': `https://instagram.com/robsterlini`,
        'Strava': `https://www.strava.com/athletes/6578573`,
        'Codepen': `https://codepen.io/robsterlini/`,
      },
    }),
  ],
  output: {
    filename: `main.js`,
    path: path.resolve(__dirname, `dist`),
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    // Taken from https://github.com/webpack/webpack-dev-server/issues/1271#issuecomment-359963173
    before(app, server, compiler) {
      const watchFiles = ['.html', '.hbs'];

      compiler.plugin('done', () => {
        const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

        if (this.hot && changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))) {
          server.sockWrite(server.sockets, 'content-changed');
        }
      });
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: `babel-loader`,
        exclude: [
          /node_modules/,
        ],
      },
      {
        test: /\.es6$/,
        use: `babel-loader`,
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
