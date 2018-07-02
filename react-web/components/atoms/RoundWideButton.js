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
        {props.icon && <span className="icon">{props.icon}</span>}
        {props.children}
      </ColorButton>
    </div>

    <style jsx>{`
      .icon {
        position: absolute;
        left: 20px;
      }
    `}</style>
  </React.Fragment>
)
