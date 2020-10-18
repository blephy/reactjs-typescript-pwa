declare module 'express-history-api-fallback' {
  interface Options {
    root?: string
    maxAge?: string
    lastModified?: boolean
    headers?: Record<string, unknown>
    dotfiles?: string
  }
  const historyFallback: (path: string, options?: Options) => VoidFunction

  export default historyFallback
}
