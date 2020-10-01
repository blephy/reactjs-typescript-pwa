import React from 'react'

const SvgrMock = React.forwardRef((properties, reference) => <span ref={reference} {...properties} />)

SvgrMock.displayName = 'SvgrMock'

export const ReactComponent = SvgrMock
export default SvgrMock
