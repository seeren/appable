module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + "/dist",
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    watchOptions: {
        ignored: /node_modules/
    }
};