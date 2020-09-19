import React from 'react'

const SvgrMock = React.forwardRef((properties, reference) => <span ref={reference} {...properties} />)

export const ReactComponent = SvgrMock
export default SvgrMock
