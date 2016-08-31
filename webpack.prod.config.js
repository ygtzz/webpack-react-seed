var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var extractCss = new ExtractTextPlugin('style/[name].[contenthash:8].css');

module.exports = {
    entry: {
        index: './src/pages/index/index.jsx',
        home: './src/pages/home/home.jsx',
        react: ['react','react-dom','react-router'],
        redux: ['redux','react-redux','react-router-redux','redux-actions']      
    },
    output: {
        path: './dist',
        filename: '[name].[hash:8].js',
        chunkFilename: "[name].[hash:8].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
			template: './src/pages/index/index.html',
            chunks: ['index','react','redux'],
            inject: 'body',
            title: 'Index Page'
		}),
        new HtmlWebpackPlugin({
            filename: 'home.html',
			template: './src/pages/home/home.html',
            chunks:['home','react','redux'],
            inject: 'body',
            title: 'Home Page'
		}),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.NODE_ENV || 'dev')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['react','redux'],
            minChunks:Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false
            }
        }),
        // new CopyWebpackPlugin([
        //     { from: 'src/static',to:'static'},
        //     { from: 'node_modules/react/dist',to:'node_modules/react/dist'}
        // ]),
        //clean folder
        new CleanWebpackPlugin(['dist'], {
            verbose: true
        }),
        extractCss,        
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules and inject the jquery library,This is required by many jquery plugins
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),        
		new webpack.HotModuleReplacementPlugin(),        
        new webpack.NoErrorsPlugin()
	],
    eslint: {
        configFile: '.eslintrc'
    },
    module: {
        loaders: [
            {test: /\.(js|jsx|es)$/, loader: "babel", exclude: /node_modules/},
            {test: /\.css$/, loader: extractCss.extract('style','css')},
            {test: /\.scss$/, loader: extractCss.extract('style','css!sass')},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"}
        ]
    },
    resolve:{
        modulesDirectories: [ "node_modules","src","src/pages", "src/widget","src/redux"],
        extensions:['','.jsx','.js','.json','.es','.css','.scss']
    },
    // externals:{
    //     'react': 'window.React',
    //     'jquery': 'window.jQuery'
    // },
    //production use cheap-module-source-map 
    devtool: 'cheap-module-source-map',   
    devServer:{
        contentBase: './dist',
        hot: true,
        inline: true,
        progress: true
    }
};
