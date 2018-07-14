import React from 'react'
import ColorButton from 'components/atoms/ColorButton'

export default props => (
  <React.Fragment>
    <div style={props.containerStyle}>
      <ColorButton
        {...props}
        outline={props.outline !== undefined ? props.outline : true}
        style={{ ...props.style, borderRadius: 30, width: '100%' }}
      >
        {props.children}
      </ColorButton>
    </div>
  </React.Fragment>
)
