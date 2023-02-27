const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ mode, slash }) => {
    const isProductionMode = mode === 'prod';
    const isDev = !isProductionMode;
    const sl = String(slash);
    const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

    const baseConfig = {
        mode: 'development',
        entry: ["@babel/polyfill", path.resolve(__dirname, './src/index.tsx')],
        resolve: {
            extensions: ['.jsx', '.tsx','.js', '.ts'],
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html',
                favicon: "src/assets/ico.png"
            }),
            new CleanWebpackPlugin(),
        ],
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, './dist'),
            publicPath: sl
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test:/\.(png|svg|jpg|jpeg|gif)$/,
                    use: 'file-loader'
                },
                {
                    test:/\.(ttf|woff|woff2|eot)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.jsx?$/, 
                    exclude: /node_modules/, 
                    loader: "babel-loader",
                    options:{
                        presets:["@babel/preset-react", "@babel/preset-env"] 
                    }
                },
                {
                    test: /\.ts$/, 
                    exclude: /node_modules/, 
                    loader: "babel-loader",
                    options:{
                        presets:["@babel/preset-typescript", "@babel/preset-env"] 
                    }
                },
                {
                    test: /\.tsx$/, 
                    exclude: /node_modules/, 
                    loader: "babel-loader",
                    options:{
                        presets:["@babel/preset-react","@babel/preset-typescript", "@babel/preset-env"] 
                    }
                }
    
            ]
        }
    }
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};