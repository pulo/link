var webpack = require("webpack");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');


module.exports = {
    entry: "./src/link.js",
    debug:false,
    context: __dirname,
    devtool:"source-map",
    output: {
        path: __dirname + "/build",
        filename: "link.js",
        publicPath: "/assets",
        
    },
    devServer: {
        port:9999,
    },
    module: {
        // loaders:[
        //     // {
        //     //     test: /\.js?$/,
        //     //     exclude: /node_modules/,
        //     //     loader: 'babel',
        //     //     query: {
        //     //         presets: ['es2015'],
        //     //     },
        //     // },
        // ],
        
    },
    plugins: [
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false,
            //     },
            // }),
            // new UnminifiedWebpackPlugin(),
    ],
    watch:true,
    
};

