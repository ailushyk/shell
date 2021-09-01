const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mfConfig = require('./mf.config.json');
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  const config = {
    output: {
      publicPath: 'http://localhost:3000/',
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'],
    },

    devServer: {
      port: 3000,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'shell' },
        // exposes: { ...mfConfig.exposes },
        remotes: { ...mfConfig.remotes },
        shared: {
          ...deps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './public/index.html',
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
    ],
  };

  if (mode === 'production') {
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      publicPath: 'http://localhost:3000/',
    };
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
};
