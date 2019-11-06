const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

const packageName = process.env.npm_config_name || undefined;
const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);
const appSrc = resolveApp(`packages/${packageName}`);
const entry = `${appSrc}/src/index.js`;

module.exports = {
    input: entry,
    plugins: [
        resolve(),
        commonjs(),
        babel(
            {
            exclude: '**/node_modules/**',
            babelrc: false,
            presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
            plugins: [
              // Stage 1
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { loose: false }],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-proposal-class-properties',
            ]
        }
        ),
    ],
}