import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { config } from 'dotenv'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import path from 'path'
import postcssNormalize from 'postcss-normalize'
import StylelintPlugin from 'stylelint-webpack-plugin'
import webpack from 'webpack'

config()

const serverBaseUrl =
  process.env.HTTPS === 'true' ? `https://${process.env.DOMAIN_NAME}` : `http://${process.env.DOMAIN_NAME}`
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
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
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
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes',
        robots: 'noodp'
      },
      title: process.env.APP_TITLE,
      preconnect: serverBaseUrl,
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.png'),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.HOST': JSON.stringify(process.env.HOST),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.DOMAIN_NAME': JSON.stringify(process.env.DOMAIN_NAME),
      'process.env.HTTPS': JSON.stringify(process.env.HTTPS),
      'process.env.SERVER_BASE_URL': JSON.stringify(serverBaseUrl),
      'process.env.CT_REPORT_URI': JSON.stringify(process.env.CT_REPORT_URI),
      'process.env.CSP_REPORT_URI': JSON.stringify(process.env.CSP_REPORT_URI),
      'process.env.APP_TITLE': JSON.stringify(process.env.APP_TITLE)
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
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: () => [postcssNormalize()]
                  }
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
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: () => [postcssNormalize()]
                  }
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
