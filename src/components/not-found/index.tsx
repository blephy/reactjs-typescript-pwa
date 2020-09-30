import React from 'react'
import { Helmet } from 'react-helmet'

const NotFound = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>404 Not found</title>
        <link rel='canonical' href={`https://${process.env.HOST}/404`} />
        <meta name='description' content='The page you requested is not found' />
      </Helmet>
      <h1>This page doesn&apos;t exist</h1>
    </>
  )
}

export default NotFound
