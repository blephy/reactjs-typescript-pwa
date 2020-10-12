import React from 'react'

import { ReactComponent as LoaderSVG } from '@/frontend/images/loader.svg'

import styles from './loader.scss'

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loaderContainer}>
      <LoaderSVG className={styles.loader} />
    </div>
  )
}
