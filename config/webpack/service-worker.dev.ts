import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const rootDir = path.join(__dirname, '..', '..')

const webpackConfig: webpack.Configuration = {
  target: 'web',
  name: 'service-worker-development',
  mode: 'development',
  context: path.resolve(rootDir, 'src', 'service-worker'),
  devtool: false,
  entry: {
    index: path.join(rootDir, 'src', 'service-worker', 'index.ts')
  },
  resolve: {
    extensions: ['.ts'],
    modules: ['node_modules', 'src'],
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  output: {
    path: path.join(rootDir, 'build'),
    filename: 'service-worker.js'
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
      lintDirtyModulesOnly: true
    })
  ]
}

export default webpackConfig
