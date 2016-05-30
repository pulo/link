var webpack = require("webpack");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
module.exports = {
    entry: "./src/link.js",
    debug:true,
    devtool:"source-map",
    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     progress: true,
    // },
    output: {
        path: "./build",
        filename: "link.js",
    },
    module: {
        loaders:[
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
        ],
        
    },
    plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
            new UnminifiedWebpackPlugin(),
    ],
    watch:true,
    
};

