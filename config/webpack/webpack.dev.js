const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const postcssNormalize = require('postcss-normalize')

const rootDir = path.join(__dirname, '..', '..')

module.exports = {
  target: 'web',
  name: 'development',
  mode: 'development',
  bail: false,
  cache: true,
  entry: {
    app: path.resolve(rootDir, 'src/index.tsx')
  },
  output: {
    path: path.resolve(rootDir, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    chunkLoadTimeout: 20000,
    pathinfo: false
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    modules: ['src', 'node_modules'],
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    openPage: '',
    compress: true,
    clientLogLevel: 'info',
    contentBase: path.resolve(rootDir, 'dist'),
    watchOptions: {
      ignored: ['node_modules', 'build', 'dist', 'server', 'config', 'coverage', 'stats', '.vscode', '.github'],
      aggregateTimeout: 200
    },
    overlay: {
      warnings: false,
      errors: true
    },
    port: '3000'
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    splitChunks: false
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
      cwd: process.cwd()
    }),
    new HtmlWebPackPlugin({
      meta: {
        description:
          "French web developer and formely medecin student. I'm doing things in javascript. Checkout my portfolio",
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes',
        robots: 'noodp'
      },
      title: 'Allan Dollé | Web developer',
      preconnect: 'https://allandolle.fr',
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.png'),
      filename: 'index.html'
    }),
    new StylelintPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: false
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [postcssNormalize()]
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [postcssNormalize()]
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
              loader: 'file-loader',
              options: {
                emitFile: true,
                outputPath: 'fonts/',
                name: '[name].[hash].[ext]'
              }
            }
          },
          {
            test: /\.(png|jp(e*)g|gif)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 8192,
                emitFile: true,
                outputPath: 'images/',
                name: '[name].[hash].[ext]'
              }
            }
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader']
          }
        ]
      }
    ]
  }
}
