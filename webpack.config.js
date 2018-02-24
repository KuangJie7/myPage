var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: ['webpack/hot/dev-server', __dirname + "/app/main.js"],
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
    },

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'// transpiling compiling
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: './build',
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 8080,
        process: true
    }
};
