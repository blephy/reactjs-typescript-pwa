declare module 'postcss-normalize' {
  interface PostCssOptions {
    allowDuplicates?: boolean
    forceImport?: boolean | string
    browsers?: string
  }

  function postcssNormalize(options?: PostCssOptions): unknown

  export = postcssNormalize
}
