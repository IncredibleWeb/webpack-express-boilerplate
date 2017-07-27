/* constants */
const isDev = process.env.NODE_ENV !== "production";
const port = 3000;
const isHttps = false;
const outputFolder = 'dist';

/* imports */
const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = [{
    name: "node",
    devtool: isDev ? "inline-sourcemap" : "hidden-source-map",
    target: 'node',
    node: {
        __dirname: true
    },
    externals: [NodeExternals()],
    entry: [
        './app.babel.js'
    ],
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'isDev': JSON.stringify(isDev),
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'port': JSON.stringify(port),
                'outputFolder': JSON.stringify(outputFolder)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin({
            disable: isDev
        }),
        new webpack.optimize.UglifyJsPlugin({
            disable: isDev,
            mangle: false,
            sourceMap: false
        }),
    ],
    module: {
        loaders: [{
            enforce: "pre",
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                emitError: true,
                failOnError: true
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}, {
    name: "web",
    devtool: isDev ? "source-map" : "hidden-source-map",
    externals: [NodeExternals()],
    entry: {
        'script.js': './src/js/main.js',
        'inline.css': './src/scss/inline.scss',
        'style.css': './src/scss/style.scss'
    },
    output: {
        path: path.join(__dirname, outputFolder),
        filename: '[name]'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `[name]`,
            allChunks: true,
        }),
        new CopyWebpackPlugin([{
            from: './src/img/',
            to: 'img/'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin({
            disable: isDev
        }),
        new webpack.optimize.UglifyJsPlugin({
            disable: isDev,
            mangle: false,
            sourceMap: false
        }),
        new SWPrecacheWebpackPlugin({
            disable: isDev,
            cacheId: 'project-name',
            filename: 'sw.js',
            minify: true,
            staticFileGlobs: [
                `/${outputFolder}/**/*.{css,js}`,
                `/${outputFolder}/img/**`
            ],
            stripPrefix: `/${outputFolder}`
        }),
        new StyleLintPlugin()
    ],
    module: {
        loaders: [{
            enforce: "pre",
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                emitError: true
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }]
    }
}];
