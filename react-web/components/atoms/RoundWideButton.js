import React from 'react'
import ColorButton from 'components/atoms/ColorButton'

export default props => (
  <React.Fragment>
    <div>
      <ColorButton
        {...props}
        outline={true}
        style={{ borderRadius: 30, width: '100%' }}
      >
        {props.children}
      </ColorButton>
    </div>
  </React.Fragment>
)
