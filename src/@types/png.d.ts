declare module '*.png' {
  interface IImage {
    height: number
    width: number
    path: string
  }
  interface IPng extends HTMLElement {
    src: string
    srcSet: string
    width: string
    height: string
    placeholder: string
    images: IImage[]
  }

  const content: IPng

  export default content
}
