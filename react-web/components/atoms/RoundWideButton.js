import React from 'react'

const Index = props => (
  <React.Fragment>
    <div>
      <button
        type="button"
        className={`btn btn-outline-primary px-4 ${props.className}`}
        style={props.style}
      >
        {props.icon && <span className="icon">{props.icon}</span>}

        {props.children}
      </button>
    </div>

    <style jsx>{`
      button {
        position: relative;
        border-radius: 30px;
        // color: ${props.color};
      }

      .icon {
        position: absolute;
        left: 20px;
      }
    `}</style>
  </React.Fragment>
)
export default Index
