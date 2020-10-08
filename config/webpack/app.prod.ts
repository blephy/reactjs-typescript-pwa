/* eslint-disable global-require */
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { config } from 'dotenv'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
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
import WebpackPwaManifest from 'webpack-pwa-manifest'

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

const webpackConfig: webpack.Configuration = {
  target: 'web',
  name: 'app-production',
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
    chunkLoadTimeout: 30000,
    pathinfo: false
  },
  devtool: false,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.png', '.gif', '.jpeg', '.jpg', '.svg'],
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
      name: (entrypoint: { name: string }): string => `runtime~${entrypoint.name}`
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
      minSize: 15000,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
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
    maxAssetSize: 150000
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
      maxChunks: 30
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 5000 // Minimum number of characters
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha512',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new HtmlWebPackPlugin({
      meta: {
        description:
          'A fast and full TypeScript PWA built with React with every best practices for SEO and web performances',
        viewport: 'width=device-width, initial-scale=1',
        robots: 'noodp'
      },
      title: 'ReactJS Progressive Web App',
      preconnect: serverBaseUrl,
      lang: 'en',
      template: path.resolve(rootDir, 'public/templates/index.ejs'),
      favicon: path.resolve(rootDir, 'public/favicon.32.png'),
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
      'process.env.SERVER_BASE_URL': JSON.stringify(serverBaseUrl)
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
          transform: (content: Buffer) => `${content.toString()}  Last update: ${new Date().toUTCString()}\r\n`,
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
      fileBlacklist: [/^(?!.*(runtime|app|home|fonts))/]
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: /^runtime.*\.js$/,
      defaultAttribute: 'async'
    }),
    new WebpackPwaManifest({
      name: 'ReactJS Progressive Web App',
      short_name: 'ReactPWA',
      orientation: 'portrait',
      description:
        'A fast and full TypeScript PWA built with React with every best practices for SEO and web performances',
      background_color: '#FFFFFF',
      theme_color: '#5A0FC8',
      crossorigin: 'anonymous',
      display: 'standalone',
      lang: 'en',
      dir: 'ltr',
      inject: true,
      fingerprints: true,
      start_url: '.',
      ios: {
        'apple-mobile-web-app-title': 'ReactPWA',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black'
      },
      icons: [
        {
          src: path.resolve(rootDir, 'public/pwa-react-logo.png'),
          destination: 'images/pwa/ios',
          sizes: [152, 167, 180, 192],
          ios: true
        },
        {
          src: path.resolve(rootDir, 'public/pwa-react-logo.png'),
          size: 512,
          destination: 'images/pwa',
          ios: 'startup'
        },
        {
          src: path.resolve(rootDir, 'public/pwa-react-logo.png'),
          size: 270,
          destination: 'images/pwa'
          // purpose: 'maskable' Waiting for the plugin to update his declaration files
        }
      ]
    }),
    new SitemapPlugin(serverBaseUrl, sitemapPaths, {
      filename: '.well-known/sitemap.xml',
      skipgzip: true,
      lastmod: true,
      priority: 0.5,
      changefreq: 'monthly'
    }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      emitError: true,
      emitWarning: true,
      failOnError: true
    }),
    new StylelintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
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
                  plugins: (): Record<string, unknown>[] => [postcssNormalize()]
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
                  plugins: (): Record<string, unknown>[] => [postcssNormalize()]
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
            test: /\.(jpe?g|png|webp)$/i,
            use: {
              loader: 'responsive-loader',
              options: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader']
          }
        ]
      }
    ]
  }
}

export default webpackConfig
