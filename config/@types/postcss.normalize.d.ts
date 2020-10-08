declare module 'postcss-normalize' {
  interface PostCssOptions {
    allowDuplicates?: boolean
    forceImport?: boolean | string
    browsers?: string
  }

  function postcssNormalize(options?: PostCssOptions): Record<string, unknown>

  export = postcssNormalize
}
