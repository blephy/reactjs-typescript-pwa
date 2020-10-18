import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { config } from 'dotenv'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

config()

const serverBaseUrl =
  process.env.HTTPS === 'true' ? `https://${process.env.DOMAIN_NAME}` : `http://${process.env.DOMAIN_NAME}`

const rootDir = path.join(__dirname, '..', '..')

const webpackConfig: webpack.Configuration = {
  target: 'node',
  name: 'server-development',
  mode: 'development',
  context: path.resolve(rootDir, 'src', 'backend'),
  bail: true,
  entry: {
    index: path.resolve(rootDir, 'src', 'backend', 'index.ts')
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
    path: path.resolve(rootDir, 'build', 'backend'),
    filename: '[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/',
    pathinfo: false
  },
  devtool: false,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', 'json'],
    modules: ['node_modules', 'src'],
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
      cwd: process.cwd()
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
      emitError: true,
      failOnError: true,
      outputReport: {
        filePath: path.resolve(rootDir, 'reports', 'backend.eslint.json')
      }
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
      }
    ]
  }
}

export default webpackConfig
