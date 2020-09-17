import './home.scss'

import React from 'react'

import { ReactComponent as Signature } from '@/images/signature.svg'

type IProperties = Record<string, unknown>

export default function Home(): React.FunctionComponentElement<IProperties> {
  return (
    <>
      <h1>Allan Doll&eacute;</h1>
      <Signature />
    </>
  )
}
