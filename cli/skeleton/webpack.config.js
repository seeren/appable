const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './src/index.scss',
    ],
    output: {
        path: `${__dirname}/www`,
        filename: 'app.js',
        globalObject: 'this',
        assetModuleFilename: '[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'raw-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'production' !== process.env.NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    watchOptions: {
        ignored: [
            '/.nyc_output/',
            '/coverage/',
            '/node_modules/',
            '/platforms/',
            '/plugins/',
            '/resources/',
            '/test/',
            '/www/',
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        new HtmlWebpackPlugin({
            template: './src/index.html',      
            publicPath: 'production' !== process.env.NODE_ENV ? '/' : '',

        }),
    ],
    devServer: {
        contentBase: './src/',
        https: false,
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
    },
};
