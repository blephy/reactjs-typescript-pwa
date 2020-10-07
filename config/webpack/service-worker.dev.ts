import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const rootDir = path.join(__dirname, '..', '..')

const webpackConfig: webpack.Configuration = {
  target: 'web',
  name: 'service-worker-development',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: path.join(rootDir, 'src', 'service-worker.ts')
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['src', 'node_modules'],
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
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      lintDirtyModulesOnly: true
    })
  ]
}

export default webpackConfig
