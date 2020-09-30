import React from 'react'

import styles from './loader.module.scss'

export default function Loader(): React.ReactElement {
  return (
    <>
      <div className={styles.loaderContainer}>
        <div className={styles.loader} />
      </div>
    </>
  )
}
