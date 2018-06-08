import React from 'react'
import omit from 'lodash/omit'

const OMIT_KEYS = ['className', 'style']

export default function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      // omit specific keys
      const newProps = omit(this.props, OMIT_KEYS)
      return (
        <div
          className={`parent ${this.props.className || ''}`}
          onClick={e => {
            e.preventDefault()
            if (this.props.onTriggerModal) this.props.onTriggerModal()
          }}
        >
          <WrappedComponent {...newProps} />

          <div className="ornament">
            <div className="popIcon rounded">Edit</div>
            <div className="overlay" />
          </div>

          <style jsx>{`
            .parent {
              position: relative;
            }

            .parent:hover {
              outline: 8px solid black;
              cursor: pointer;
            }

            .ornament {
              display: none;
            }

            .parent:hover .ornament {
              display: block;
            }

            .popIcon {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 51px;
              height: 26px;
              background: black;
              color: white;
              font-size: 11px;
              padding: 5px 16px;
              z-index: 101;
            }

            .overlay {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.3);
              z-index: 100;
            }
          `}</style>
        </div>
      )
    }
  }
}
