declare module 'sitemap-webpack-plugin' {
  class SitemapPlugin {
    constructor(baseUrl: string, sitemapPaths: Record<string, unknown>[], options: Record<string, unknown>)
  }

  export = SitemapPlugin
}
