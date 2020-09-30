import React from 'react'

import { ReactComponent as Signature } from '@/images/signature.svg'

import styles from './home.module.scss'

type IProperties = Record<string, unknown>

export default function Home(): React.FunctionComponentElement<IProperties> {
  return (
    <>
      <h1 className={styles.title}>Allan Doll&eacute;</h1>
      <Signature className={styles.signature} />
    </>
  )
}
