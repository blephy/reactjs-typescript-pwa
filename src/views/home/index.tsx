import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import { ReactComponent as Signature } from '@/images/signature.svg'

import styles from './home.module.scss'

type TMatch = {
  path: string
}

export default function Home({
  match
}: RouteComponentProps<TMatch>): React.FunctionComponentElement<RouteComponentProps> {
  const { path } = match
  const canonicalUrl = `${process.env.SERVER_BASE_URL}${path}`
  const description = 'A fast and secure progressive web app with every best practices for SEO and web performances'

  return (
    <>
      <Helmet>
        <title>Home</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content={description} />
      </Helmet>
      <h1 className={styles.title}>ReactJS Progressive Web App</h1>
      <Signature className={styles.signature} />
    </>
  )
}
