declare module '*.png' {
  interface IResponsiveLoaderAssetsImage {
    height: number
    width: number
    path: string
  }
  interface IResponsiveLoaderAssets extends HTMLElement {
    src: string
    srcSet: string
    width: string
    height: string
    placeholder: string
    images: IResponsiveLoaderAssetsImage[]
  }

  const content: IResponsiveLoaderAssets

  export = content
}
