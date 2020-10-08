declare module 'sitemap-webpack-plugin' {
  export type TChangefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

  export interface ISitemapPath {
    path: string
    priority?: number
    lastmod?: string
    changefreq?: TChangefreq
  }

  export interface ISitemapOptions {
    filename?: string
    skipgzip?: boolean
    formatter?: () => void
    lastmod?: string | boolean
    priority?: number
    changefreq?: TChangefreq
  }

  class SitemapPlugin {
    constructor(baseUrl: string, sitemapPaths: ISitemapPath[], options: ISitemapOptions)
    apply(): () => void
  }

  export default SitemapPlugin
}
