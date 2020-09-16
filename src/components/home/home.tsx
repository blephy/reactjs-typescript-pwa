import React from 'react'

import Signature from '@images/signature.svg'
import './home.scss'

type IProperties = Record<string, unknown>

export default function Home(): React.FunctionComponentElement<IProperties> {
  return (
    <>
      <h1>Allan Doll&eacute;</h1>
      <h3>Hey !</h3>
      <Signature />
    </>
  )
}
