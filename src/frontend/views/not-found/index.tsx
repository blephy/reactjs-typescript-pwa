import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

type TMatch = {
  path: string
}

export default function NotFound({
  match
}: RouteComponentProps<TMatch>): React.FunctionComponentElement<RouteComponentProps> {
  const { path } = match
  const canonicalUrl = `${process.env.SERVER_BASE_URL}${path}`

  return (
    <>
      <Helmet>
        <title>404 Not found</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content='The page you requested is not found' />
      </Helmet>
      <h1>This page doesn&apos;t exist</h1>
    </>
  )
}
