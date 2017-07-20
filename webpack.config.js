/*
* References Used:
* https://stackoverflow.com/questions/37788142/webpack-for-back-end
*/

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
    module: {
        loaders: [ /* common loaders */ ]
    },
    plugins: [ /* common plugins */ ],
    resolve: {
        extensions: ['.scss', '.js'],
    }
    // other plugins, postcss config etc. common for frontend and backend
};

// const frontend = {
//      entry: [
//          'frontend.js'
//      ],
//      output: {
//         filename: 'frontend-output.js'
//      }
//      // other loaders, plugins etc. specific for frontend
// };

const extractSass = new ExtractTextPlugin({
    filename: 'dist/[name].bundle.css',
    allChunks: true,
});

const backend = {
    target: 'node',
    entry: [
        './app.babel.js',
        './src/scss/style.scss',
        './src/scss/inline.scss'
    ],
    output: {
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                }),
            }
        ]
    },
    plugins: [
        extractSass
    ]
};

module.exports = [
    // Object.assign({} , common, frontend),
    Object.assign({} , common, backend)
];
