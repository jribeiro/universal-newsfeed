
const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(ROOT_PATH, 'src/browser/index'),
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ["react-hot", "babel"],
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        // path: path.resolve(ROOT_PATH, '_cdn'),
        publicPath: 'assets',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'http://localhost:8000',
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
