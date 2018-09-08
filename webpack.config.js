const path = require('path');
const webpack = require('webpack');

var apiHost;

function setupApi() {
  switch (process.env.NODE_ENV) {
    case 'production':
      apiHost = "'https://meb-admin.herokuapp.com'";
      break;
    default:
      apiHost = "'http://localhost:3000'";
      break;
  }
}

setupApi();

module.exports = {
  entry: './webpack/entry.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({__API__: apiHost})
  ],
  "devtool": "source-map"
};
