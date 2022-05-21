const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    // Here the application starts executing
    // and webpack starts bundling
    output: {
    // options related to how webpack emits results
      path: path.resolve(__dirname, "dist"), // string
      // the target directory for all output files
      // must be an absolute path (use the Node.js path module)
      filename: "bundle.js", // string
      // the filename template for entry chunks
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'public'
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 8000,
        open: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}