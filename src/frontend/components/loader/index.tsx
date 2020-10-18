import React from 'react'

import styles from './loader.module.scss'

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div />
        <div />
      </div>
    </div>
  )
}
