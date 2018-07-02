import React from 'react'

const Index = props => (
  <React.Fragment>
    <div id="RoundWideButton">
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
        font-weight: bold;
        position: relative;
        border-radius: 30px;
        padding-top: 13px;
        padding-bottom: 13px;
      }

      .icon {
        position: absolute;
        left: 20px;
      }

      button {
        color: ${props.color} !important;
        border-color: ${props.color} !important;
      }

      button.btn:active,
      button.btn:hover {
        color: white !important;
        border-color: ${props.color} !important;
        background-color: ${props.color} !important;
      }
    `}</style>
  </React.Fragment>
)
export default Index
