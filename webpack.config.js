'use strict';

const webpack = require('webpack');

let config = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'ngreact-test-utils.js',
        libraryTarget: 'commonjs'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        }]
    },
    externals: [
        /^angular/,
        /^react/,
        /^lodash/
    ]
};

module.exports = config;