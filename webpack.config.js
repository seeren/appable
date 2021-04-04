module.exports = {
    entry: './src/appable.ts',
    output: {
        path: `${__dirname}/dist`,
        filename: 'appable.js',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
};
