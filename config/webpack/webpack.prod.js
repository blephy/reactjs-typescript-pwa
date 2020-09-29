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
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin')

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
  bail: true,
  entry: {
    app: path.resolve(rootDir, 'src/index.tsx')
  },
  stats: {
    // context: '../../src',
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
        description:
          "French web developer and formely medecin student. I'm doing things in javascript. Checkout my portfolio",
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes',
        robots: 'noodp'
      },
      title: 'Allan Dollé | Web developer',
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.png'),
      filename: 'index.html',
      minify: true,
      xhtml: true,
      preconnect: 'https://allandolle.fr/',
      cspPlugin: {
        enabled: true,
        hashingMethod: 'sha512',
        policy: {
          'default-src': ["'self'", 'https:', 'allandolle.fr', 'locahost'],
          'font-src': ["'self'", 'data:'],
          'script-src': ["'self'"],
          'style-src': ["'self'"],
          'base-uri': ["'self'"],
          'connect-src': ["'none'"],
          'img-src': ["'self'", 'data:'],
          'object-src': ["'none'"],
          'frame-src': ["'none'"],
          'upgrade-insecure-requests': '',
          'block-all-mixed-content': ''
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
          from: path.resolve(rootDir, 'public', 'humans.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: content => `${content}  Last update: ${new Date().toGMTString()}`
        },
        {
          from: path.resolve(rootDir, 'public', 'robots.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: content => `${content}\r\n# Sitemap\r\nSitemap: https://allandolle.fr/.well-known/sitemap.xml\r\n`,
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
    new SitemapPlugin('https://allandolle.fr', sitemapPaths, {
      filename: '.well-known/sitemap.xml',
      skipgzip: true,
      lastmod: true,
      priority: 0.5,
      changefreq: 'monthly'
    }),
    new CspHtmlWebpackPlugin(),
    new StylelintPlugin(),
    new BundleStatsWebpackPlugin({
      html: false,
      json: true,
      outDir: '../stats/'
    })
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
