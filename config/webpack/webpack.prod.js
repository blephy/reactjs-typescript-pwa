const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const postcssNormalize = require('postcss-normalize')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent')
const { HOST, API_URL, TITLE, CT_REPORT_URI, CSP_REPORT_URI } = require('..')

const sitemapPaths = [
  {
    path: '/',
    priority: '0.8'
  }
]

const rootDir = path.join(__dirname, '..', '..')

module.exports = {
  target: 'web',
  name: 'production',
  mode: 'production',
  context: path.resolve(rootDir, 'src'),
  bail: true,
  entry: {
    app: path.resolve(rootDir, 'src/index.tsx')
  },
  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true
  },
  output: {
    path: path.resolve(rootDir, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    chunkLoadTimeout: 20000,
    pathinfo: false
  },
  devtool: 'none',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    modules: ['src', 'node_modules'],
    alias: {
      '@': path.resolve(rootDir, 'src')
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
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes',
        robots: 'noodp'
      },
      title: TITLE,
      preconnect: `https://${HOST}`,
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.png'),
      filename: 'index.html',
      minify: true,
      xhtml: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.HOST': JSON.stringify(process.env.HOST || HOST),
      'process.env.API_URL': JSON.stringify(process.env.API_URL || API_URL),
      'process.env.CT_REPORT_URI': JSON.stringify(process.env.CT_REPORT_URI || CT_REPORT_URI),
      'process.env.CSP_REPORT_URI': JSON.stringify(process.env.CSP_REPORT_URI || CSP_REPORT_URI),
      'process.env.TITLE': JSON.stringify(process.env.TITLE || TITLE)
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
          from: path.resolve(rootDir, 'public', 'humans.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: content => `${content}  Last update: ${new Date().toGMTString()}`
        },
        {
          from: path.resolve(rootDir, 'public', 'robots.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: content => `${content}\r\n# Sitemap\r\nSitemap: https://${HOST}/.well-known/sitemap.xml\r\n`,
          cacheTransform: true
        },
        {
          from: path.resolve(rootDir, 'public', 'security.txt'),
          to: path.resolve(rootDir, 'build/.well-known'),
          cacheTransform: true
        }
      ]
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial'
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: /^runtime.*\.js$/,
      defaultAttribute: 'async'
    }),
    new SitemapPlugin(`https://${HOST}`, sitemapPaths, {
      filename: '.well-known/sitemap.xml',
      skipgzip: true,
      lastmod: true,
      priority: 0.5,
      changefreq: 'monthly'
    }),
    new StylelintPlugin(),
    new RelativeCiAgentWebpackPlugin()
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
              MiniCssExtractPlugin.loader,
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
