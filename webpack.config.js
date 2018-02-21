const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
// themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont'";
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/demo-theme.less'), 'utf8'));

const srcPath = path.join(__dirname, '..', './public/');
const includePaths = [
    srcPath
];

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './public')
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        historyApiFallback: true
    },
    resolve: {
        modules: ['src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                options: {
                    presets: [
                        ['env', {modules: false, targets: {browsers: ['last 2 versions']}}],
                        'react'
                    ],
                    cacheDirectory: true,
                    plugins: [
                        ['import', {libraryName: "antd", style: true}],
                        'transform-strict-mode',
                        'transform-object-rest-spread'
                    ]
                },
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: themeVariables,
                            root: path.resolve(__dirname, './')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body'
        })
    ],
};
