import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { config } from 'dotenv'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import path from 'path'
import postcssNormalize from 'postcss-normalize'
import StylelintPlugin from 'stylelint-webpack-plugin'
import webpack from 'webpack'

config()

const serverBaseUrl =
  process.env.HTTPS === 'true' ? `https://${process.env.DOMAIN_NAME}` : `http://${process.env.DOMAIN_NAME}`
const rootDir = path.join(__dirname, '..', '..')

const webpackConfig: webpack.Configuration = {
  target: 'web',
  name: 'app-development',
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
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.png', '.gif', '.jpeg', '.jpg', '.svg'],
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
    contentBase: path.resolve(rootDir, 'build'),
    watchOptions: {
      ignored: ['node_modules', 'build', 'server', 'public', 'config', 'coverage', 'stats', '.vscode', '.github']
    },
    overlay: {
      warnings: false,
      errors: true
    },
    port: 3000
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
        viewport: 'width=device-width, initial-scale=1',
        robots: 'noodp'
      },
      title: 'ReactJS Progressive Web App',
      preconnect: serverBaseUrl,
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.32.png'),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.DOMAIN_NAME': JSON.stringify(process.env.DOMAIN_NAME),
      'process.env.HTTPS': JSON.stringify(process.env.HTTPS),
      'process.env.SERVER_BASE_URL': JSON.stringify(serverBaseUrl)
    }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      lintDirtyModulesOnly: true
    }),
    new StylelintPlugin({
      lintDirtyModulesOnly: true
    }),
    new ReactRefreshWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      },
      {
        oneOf: [
          {
            test: /\.html$/i,
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
            test: /\.css$/i,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: (): Record<string, unknown>[] => [postcssNormalize()]
                }
              }
            ]
          },
          {
            test: /\.scss$/i,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: (): Record<string, unknown>[] => [postcssNormalize()]
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
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
            test: /\.(jpe?g|png|webp)$/i,
            use: {
              loader: 'responsive-loader',
              options: {
                // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment
                adapter: require('responsive-loader/sharp'),
                name: '[name].[width].[hash].[ext]',
                outputPath: 'images/',
                sizes: [320, 640, 960, 1280],
                quality: 75,
                format: 'webp',
                emitFile: true
              }
            }
          },
          {
            test: /\.svg$/i,
            use: ['@svgr/webpack', 'url-loader']
          }
        ]
      }
    ]
  }
}

export default webpackConfig
