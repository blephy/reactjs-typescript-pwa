/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import PwaReact from '@/images/pwa-react-uhd-trans.png'

// import { ReactComponent as Signature } from '@/images/signature.svg'
import styles from './home.module.scss'

type TMatch = {
  path: string
}

export default function Home({
  match
}: RouteComponentProps<TMatch>): React.FunctionComponentElement<RouteComponentProps> {
  const { path } = match
  const canonicalUrl = `${process.env.SERVER_BASE_URL}${path}`
  const appTitle = process.env.APP_TITLE
  const description = 'A fast and secure progressive web app with every best practices for SEO and web performances'

  return (
    <>
      <Helmet>
        <title>Home</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content={description} />
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>{appTitle}</h1>
        <picture>
          <source srcSet={PwaReact.srcSet} />
          <img src={PwaReact.src} width={PwaReact.width} height={PwaReact.height} alt={appTitle} />
        </picture>
        {/* <Signature className={styles.signature} /> */}
      </div>
    </>
  )
}
