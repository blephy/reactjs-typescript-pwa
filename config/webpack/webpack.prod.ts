import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { config } from 'dotenv'
import ESLintPlugin from 'eslint-webpack-plugin'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import postcssNormalize from 'postcss-normalize'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import SitemapPlugin, { ISitemapPath } from 'sitemap-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

config()

const serverBaseUrl =
  process.env.HTTPS === 'true' ? `https://${process.env.DOMAIN_NAME}` : `http://${process.env.DOMAIN_NAME}`

const sitemapPaths: ISitemapPath[] = [
  {
    path: '/',
    priority: 0.8
  },
  {
    path: '/404',
    priority: 0.2,
    changefreq: 'yearly'
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
      name: (entrypoint: { name: string }) => `runtime~${entrypoint.name}`
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
      title: process.env.TITLE,
      preconnect: serverBaseUrl,
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.png'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        html5: true
      },
      xhtml: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.DOMAIN_NAME': JSON.stringify(process.env.DOMAIN_NAME),
      'process.env.HTTPS': JSON.stringify(process.env.HTTPS),
      'process.env.SERVER_BASE_URL': JSON.stringify(serverBaseUrl),
      'process.env.CT_REPORT_URI': JSON.stringify(process.env.CT_REPORT_URI),
      'process.env.CSP_REPORT_URI': JSON.stringify(process.env.CSP_REPORT_URI),
      'process.env.APP_TITLE': JSON.stringify(process.env.APP_TITLE)
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].chunk.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, 'public', 'humans.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: (content: Buffer) => `${content.toString()}  Last update: ${new Date().toUTCString()}`,
          cacheTransform: false
        },
        {
          from: path.resolve(rootDir, 'public', 'robots.txt'),
          to: path.resolve(rootDir, 'build'),
          transform: (content: Buffer) =>
            `${content.toString()}\r\n# Sitemap\r\nSitemap: ${serverBaseUrl}/.well-known/sitemap.xml\r\n`,
          cacheTransform: false
        },
        {
          from: path.resolve(rootDir, 'public', 'security.txt'),
          to: path.resolve(rootDir, 'build/.well-known'),
          cacheTransform: false
        }
      ]
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [/^(?!.*(runtime|home|app))/]
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: /^runtime.*\.js$/,
      defaultAttribute: 'async'
    }),
    new SitemapPlugin(serverBaseUrl, sitemapPaths, {
      filename: '.well-known/sitemap.xml',
      skipgzip: true,
      lastmod: true,
      priority: 0.5,
      changefreq: 'monthly'
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      failOnError: true
    }),
    new StylelintPlugin()
  ],
  module: {
    rules: [
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
