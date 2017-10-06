const path = require("path");

const SRC_DIR = path.resolve(__dirname, "src");
const DIST_DIR = path.resolve(__dirname, "dist");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    devtool: "source-map",
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                loader: "babel-loader",
                include: SRC_DIR,
                options: {
                    presets: ["react", "es2015", "stage-2"]
                },
                exclude: /node_modules/
            },
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                include: SRC_DIR,
                options: {
                    presets: ["react", "es2015", "stage-2"]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig],
    devServer: {
        contentBase: SRC_DIR,
        inline: true,
        historyApiFallback: true
    }
};