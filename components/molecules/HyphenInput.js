import React from 'react'
import TallTextInput from '../atoms/TallTextInput'

export default class HyphenInput extends React.Component {
  render() {
    const props = this.props

    return (
      <div style={props.style}>
        <div className="row box">
          {props.values.map((v, i) => {
            return (
              <div className="col-3" key={`HyphenInput-${i}`}>
                <TallTextInput type="tel" />
              </div>
            )
          })}
        </div>

        <style jsx>{`
          .box {
            position: relative;
            margin: 0 auto;
          }

          .box .col-3 {
            width: 25%;
            max-width: 150px;
            position: relative;
          }

          .box .col-3:not(:last-child) {
            margin-right: 16px;
          }

          .box .col-3:not(:nth-child(1))::before {
            content: '-';
            position: absolute;
            left: -12px;
            top: 12px;
            color: black;
            border: 0px solid;
          }
        `}</style>
      </div>
    )
  }
}
