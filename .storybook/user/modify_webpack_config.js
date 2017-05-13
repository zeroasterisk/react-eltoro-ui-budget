const path = require('path');
module.exports = function (config) {
  // This is the default webpack config defined in the `../webpack.config.js`
  // modify as you need.
  config.module.loaders = [
    {
      test: /\.css?$/,
      loaders: ['style', 'css', 'raw'],
      include: path.resolve(__dirname, '../../'),
    },
    {
      test: /\.(gif|woff)?$/,
      loaders: ['raw'],
      include: path.resolve(__dirname, '../../'),
    }
  ];
};
