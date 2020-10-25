const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist")
    },
    devServer: {
        contentBase: path.resolve("./dist"),
        index: "index.html",
        port: 9000,
        https: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Accept": "application/json"
        },
        proxy: {
            '/api/github': {
                target: 'https://api.github.com',
                pathRewrite: { '^/api/github/': '/' },
                secure: false,
                changeOrigin: true
            },
            '/github': {
                target: 'https://github.com',
                pathRewrite: { '^/github/': '/' },
                secure: false,
                changeOrigin: true
            }
        }
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: "/node_modules",
                use: ['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            favicon: './public/people-fill.svg'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};