import { ManifestOptions } from 'webpack-pwa-manifest'

/**
 * Open Graph Facebook meta
 */
export interface FacebookOpenGraph {
  'og:title': string
  'og:url'?: string
  'og:site_name'?: string
  'og:description'?: string
  'og:image'?: string
  'og:image:secure_url'?: string
  'og:image:type'?:
    | 'image/jpeg'
    | 'image/gif'
    | 'image/png'
    | 'image/webp'
    | 'image/flif'
    | 'image/apng'
    | 'image/x-mng'
  'og:image:width'?: string
  'og:image:height'?: string
  'og:image:alt'?: string
  'fb:app_id'?: string
  'og:audio'?: string
  'og:video'?: string
  'og:type'?: 'article' | 'book' | 'profile' | 'website'
  'og:determiner'?: 'a' | 'an' | 'the' | 'auto' | ''
  'og:locale'?: string
  'og:locale:alternate'?: string[]
  /** Any other meta */
  [key: string]: string
}

/**
 * Twitter card meta
 */
export interface TwitterCard {
  /** Card type */
  'twitter:card': 'summary' | 'summary_large_image' | 'app' | 'player'
  /** @username for the website used in the card footer. */
  'twitter:site': string
  /** Same as twitter:site, but the user’s Twitter ID */
  'twitter:site:id': string
  /** @username for the content creator / author. */
  'twitter:creator': string
  /** Twitter user ID of content creator */
  'twitter:creator:id': string
  'twitter:url': string
  /** Title of content (max 70 characters) */
  'twitter:title': string
  /** Description of content (maximum 200 characters) */
  'twitter:description': string
  /** URL of image to use in the card */
  'twitter:image': string
  /** Image description (max 420 characters) */
  'twitter:image:alt': string
  /** HTTPS URL of player iframe */
  'twitter:player': string
  /** Width of iframe in pixels */
  'twitter:player:width': string
  /** Height of iframe in pixels */
  'twitter:player:height': string
  /** URL to raw video or audio stream */
  'twitter:player:stream': string
  /** Name of your iPhone app */
  'twitter:app:name:iphone': string
  /** Your app ID in the iTunes App Store */
  'twitter:app:id:iphone': string
  /** Your app’s custom URL scheme (you must include ”://” after your scheme name) */
  'twitter:app:url:iphone': string
  /** Name of your iPad optimized app */
  'twitter:app:name:ipad': string
  /** Your app ID in the iTunes App Store */
  'twitter:app:id:ipad': string
  /** Your app’s custom URL scheme */
  'twitter:app:url:ipad': string
  /** Name of your Android app */
  'twitter:app:name:googleplay': string
  /** Your app ID in the Google Play Store */
  'twitter:app:id:googleplay': string
  /** Your app’s custom URL scheme */
  'twitter:app:url:googleplay': string
}

/**
 * Application meta for the html template
 */
export interface ApplicationMeta {
  /** Description of the application */
  description?: string
  /** Robots policy */
  robots?:
    | 'all'
    | 'noodp'
    | 'noindex'
    | 'nofollow'
    | 'follow'
    | 'index'
    | 'nosnippet'
    | 'noarchive'
    | 'noimageindex'
    | 'none'
    | string
  /** Viewport of the application */
  viewport?: string
  /** Open Graph Facebook meta */
  facebook?: FacebookOpenGraph
  /** Twitter Card meta */
  twitter?: TwitterCard
  /** Any other meta */
  [key: string]: string
}

/**
 * Application configuration
 */
export interface ApplicationConfig {
  /** Title of the application */
  title: string
  /** Version of the application */
  version: string
  /** Application's short name */
  short_name: string
  /** Application language */
  lang: string
  /** Meta properties */
  meta?: ApplicationMeta
  /** The relative path to Favicon from root folder */
  favicon: string
}

export interface EnvironnementConfig {
  /** Api url to fetch data (https://myapi.com/api/v1) */
  api_url?: string
  /** Server listening port */
  port: number
  /** Domain name */
  domainName: string
  /** HTTPS configuration */
  https?:
    | {
        key: string
        cert: string
        ca: string
      }
    | false
  /** Source map (https://webpack.js.org/configuration/devtool/) */
  devTools?: false | string
  /** Cache */
  cache?: boolean
  /** Certificate Transparency (report uri) */
  ct_report_uri?: string
  /** Content Security Policy (report uri) */
  csp_report_uri?: string
  /** Api reporting (report uri) */
  api_report_uri?: string
}

export interface EnvironnementsListConfig {
  /** Development environnement config */
  development: EnvironnementConfig
  /** Production environnement config */
  production?: EnvironnementConfig
  /** Any other environnement config */
  [key: string]: EnvironnementConfig
}

/**
 * Main configuration
 */
export interface Config {
  app: ApplicationConfig
  pwa: ManifestOptions
  env: EnvironnementsListConfig
}
