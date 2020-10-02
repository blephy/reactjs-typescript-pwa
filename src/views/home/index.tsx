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

  return (
    <>
      <Helmet>
        <title>Analyst developer</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content='Welcome to my portfolio' />
      </Helmet>
      <h1 className={styles.title}>Allan Doll&eacute;</h1>
      <Signature className={styles.signature} />
    </>
  )
}
