'use strict';

const {
  resolve,
  join
} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const moduleConf = require('./webpack-module.config');
const nomoduleConf = require('./webpack-nomodule.config');

const ENV = process.argv.find(arg => arg.includes('NODE_ENV=production')) ? 'production' : 'development';
const IS_DEV_SERVER = process.argv.find(arg => arg.includes('webpack-dev-server'));
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('src') : resolve('dist');

const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

/**
 * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: [{
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }],
  copyOthers: [{
    from: 'assets/**/*.*',
    context: resolve('./src'),
    to: OUTPUT_PATH
  }, {
    from: resolve('./src/index.html'),
    to: OUTPUT_PATH,
    flatten: true
  }]
};

/**
 * Plugin configuration
 */
const sharedPlugins = [new webpack.DefinePlugin({
  'process.env': processEnv
})];
const devPlugins = [new CopyWebpackPlugin(copyStatics.copyWebcomponents)];
const buildPlugins = [
  new CopyWebpackPlugin(
    [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  )
];

const plugins = sharedPlugins.concat(IS_DEV_SERVER ? devPlugins : buildPlugins);

const shared = env => {
  const IS_MODULE_BUILD = env.BROWSERS === 'module';
  return {
    mode: ENV,
    entry: './src/index.js',
    output: {
      path: OUTPUT_PATH,
      filename: IS_MODULE_BUILD ? 'module.bundle.js' : 'bundle.js'
    },
    module: {
      rules: [{
          test: /\.html$/,
          use: ['text-loader']
        },
        {
          test: /\.less$/,
          use: ['text-loader', 'less-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins,
    devServer: {
      contentBase: OUTPUT_PATH,
      compress: true,
      overlay: {
        errors: true
      },
      port: 3000,
      host: 'localhost',
      disableHostCheck: true
    }
  };
};

module.exports = (env = {}) => merge(env.BROWSERS === 'module' ? moduleConf() : nomoduleConf(), shared(env));
