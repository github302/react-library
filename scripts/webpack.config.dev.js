const path = require('path');
const packageName = process.env.npm_config_name || undefined;

const appSrc = path.resolve(__dirname, `../packages/${packageName}/src/index.js`)
const appDist = path.resolve(__dirname, `../packages/${packageName}/lib`);
module.exports = {
    mode: 'production',
    entry: appSrc,
    output: {
        path: appDist,
        filename: `${packageName}.js`,
        library: packageName,
        libraryTarget: 'umd',
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'react',
        }
    },
    module: {
        rules: [
            {
                test: /\.(js?|jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    }
}