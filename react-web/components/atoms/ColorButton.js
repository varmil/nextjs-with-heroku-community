import React from 'react'

const Index = props => (
  <React.Fragment>
    <button
      type="button"
      className={`btn ${
        props.outline ? 'btn-outline-primary' : 'btn-primary'
      }  ${props.className}`}
      style={props.style}
    >
      {props.children}
    </button>

    <style jsx>{`
      button {
        font-weight: bold;
        padding-top: 13px;
        padding-bottom: 13px;
      }

      button {
        color: ${props.outline ? props.color : 'white'} !important;
        background-color: ${props.outline ? 'initial' : props.color} !important;
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
