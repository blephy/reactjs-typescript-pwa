const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const postcssNormalize = require('postcss-normalize')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const paths = [
  {
    path: '/',
    priority: '0.8'
  },
  {
    path: '/loader/'
  }
]

module.exports = {
  target: 'web',
  name: 'production',
  mode: 'production',
  bail: true,
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    chunkLoadTimeout: 20000,
    pathinfo: false
  },
  devtool: 'none',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    modules: ['src', 'node_modules'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src', 'components'),
      '@database': path.resolve(__dirname, '../src', 'database'),
      '@styles': path.resolve(__dirname, '../src', 'styles'),
      '@fonts': path.resolve(__dirname, '../src', 'fonts'),
      '@images': path.resolve(__dirname, '../src', 'images')
    }
  },
  optimization: {
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    namedChunks: true,
    namedModules: true,
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin({
        sourceMap: false,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 25000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 0
        },
        default: {
          priority: -1,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 250000,
    maxAssetSize: 200000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
      cwd: process.cwd()
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 80,
      minChunkSize: 25000
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebPackPlugin({
      meta: {
        description:
          "French web developer and formely medecin student. I'm doing things in javascript. Checkout my portfolio",
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes',
        robots: 'noodp'
      },
      title: 'Allan Dollé | Web developer',
      preconnect: 'https://allandolle.fr',
      template: path.join(__dirname, '../public/templates/index.ejs'),
      favicon: path.join(__dirname, '../public/favicon.png'),
      filename: 'index.html',
      minify: true,
      xhtml: true,
      cspPlugin: {
        enabled: true,
        policy: {
          'default-src': ["'self'", 'https:', 'allandolle-portfolio.herokuapp.com', 'locahost'],
          'font-src': ["'self'", 'https:', 'data:'],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'],
          'style-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'],
          'base-uri': "'self'",
          'connect-src': ["'self'", 'https:', 'wss:', 'allandolle-portfolio.herokuapp.com', 'allandolle.fr'],
          'img-src': ["'self'", 'https:', 'data:'],
          'object-src': "'self'"
        },
        hashEnabled: {
          'script-src': true,
          'style-src': true
        },
        nonceEnabled: {
          'script-src': true,
          'style-src': true
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].chunk.css',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public', 'humans.txt'),
          to: path.resolve(__dirname, '../build'),
          transform: content => `${content}  Last update: ${new Date().toGMTString()}`,
          cacheTransform: true
        },
        {
          from: path.join(__dirname, '../public', 'robots.txt'),
          to: path.resolve(__dirname, '../build'),
          cacheTransform: true
        }
      ]
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\.js$/,
        attribute: 'crossorigin',
        value: 'anonymous'
      },
      defaultAttribute: 'async'
    }),
    new SitemapPlugin('https://allandolle.fr', paths, {
      filename: 'sitemap.xml',
      skipgzip: true,
      lastmod: true,
      priority: 0.5,
      changefreq: 'monthly'
    }),
    new CspHtmlWebpackPlugin(),
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
                  minimize: true,
                  removeComments: true,
                  collapseWhitespace: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
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
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
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
            use: ['@svgr/webpack']
          }
        ]
      }
    ]
  }
}
