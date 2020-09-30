import React from 'react'
import { Helmet } from 'react-helmet'

import { ReactComponent as Signature } from '@/images/signature.svg'

import styles from './home.module.scss'

type IProperties = Record<string, unknown>

export default function Home(): React.FunctionComponentElement<IProperties> {
  return (
    <>
      <Helmet>
        <title>Analyst developer</title>
        <link rel='canonical' href={`https://${process.env.HOST}`} />
        <meta name='description' content='Welcome to my portfolio' />
      </Helmet>
      <h1 className={styles.title}>Allan Doll&eacute;</h1>
      <Signature className={styles.signature} />
    </>
  )
}
