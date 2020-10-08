import React from 'react'

import { ReactComponent as LoaderSVG } from '@/images/loader.svg'

import styles from './loader.module.scss'

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loaderContainer}>
      <LoaderSVG className={styles.loader} />
    </div>
  )
}
