declare module 'webpack-pwa-manifest' {
  export type TCrossorigin = null | 'use-credentials' | 'anonymous'
  export type TDisplay = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  export type TOrientation =
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary'
  export type TCategories =
    | 'books'
    | 'business'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'fitness'
    | 'food'
    | 'games'
    | 'government'
    | 'health'
    | 'kids'
    | 'lifestyle'
    | 'magazines'
    | 'medical'
    | 'music'
    | 'navigation'
    | 'news'
    | 'personalization'
    | 'photo'
    | 'politics'
    | 'productivity'
    | 'security'
    | 'shopping'
    | 'social'
    | 'sports'
    | 'travel'
    | 'utilities'
    | 'weather'
  export type TDir = 'auto' | 'rtl' | 'ltr'
  export type TPurpose = 'monochrome' | 'maskable' | 'any'
  export interface IIcon {
    src: string
    sizes?: number[]
    size?: number
    destination?: string
    ios?: boolean | 'startup'
    purpose?: TPurpose
  }

  export interface IOptions {
    name?: string
    short_name?: string
    description?: string
    background_color?: string
    theme_color?: string
    filename?: string
    display?: TDisplay
    dir?: TDir
    lang?: string
    orientation?: TOrientation
    start_url?: string
    crossorigin?: TCrossorigin
    inject?: boolean
    fingerprints?: boolean
    ios?: boolean | Record<string, string>
    publicPath?: string
    includeDirectory?: boolean
    icons?: IIcon[]
  }

  class WebpackPwaManifest {
    constructor(options?: IOptions)
    apply(): () => void
  }

  export default WebpackPwaManifest
}
