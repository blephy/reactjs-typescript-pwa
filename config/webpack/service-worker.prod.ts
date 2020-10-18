import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

const rootDir = path.join(__dirname, '..', '..')

const webpackConfig: webpack.Configuration = {
  target: 'web',
  name: 'service-worker-production',
  mode: 'production',
  context: path.resolve(rootDir, 'src', 'frontend', 'service-worker'),
  devtool: false,
  entry: {
    index: path.join(rootDir, 'src', 'frontend', 'service-worker', 'index.ts')
  },
  resolve: {
    extensions: ['.ts'],
    modules: ['node_modules', 'src'],
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  output: {
    path: path.join(rootDir, 'build', 'frontend'),
    filename: 'service-worker.js'
  },
  optimization: {
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
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ESLintWebpackPlugin({
      extensions: ['ts'],
      emitError: true,
      emitWarning: true,
      failOnError: true,
      outputReport: {
        filePath: path.resolve(rootDir, 'reports', 'service-worker.eslint.json')
      }
    })
  ]
}

export default webpackConfig
