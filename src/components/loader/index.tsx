import './loader.scss'

import React from 'react'

export default function Loader(): React.ReactElement {
  return (
    <>
      <div className='loader-container'>
        <div className='loader' />
      </div>
    </>
  )
}
