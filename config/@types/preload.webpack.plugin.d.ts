declare module 'preload-webpack-plugin' {
  class PreloadWebpackPlugin {
    constructor(options: Record<string, unknown>)
    apply(): () => void
  }

  export = PreloadWebpackPlugin
}
