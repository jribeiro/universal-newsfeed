
const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080',
        path.resolve(ROOT_PATH, 'src/main/browser/index'),
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel'],
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: path.resolve(ROOT_PATH, '_cdn'),
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'build'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
