import React from 'react'
export default class MultiLineText extends React.Component {
  render() {
    const renderTexts = () => {
      if (typeof this.props.children === 'string') {
        const arr = this.props.children.split('\n')
        return arr.map((m, i) => (
          <span key={i}>
            {m}
            {i !== arr.length - 1 ? <br /> : null}
          </span>
        ))
      } else {
        return ''
      }
    }
    return <React.Fragment>{renderTexts()}</React.Fragment>
  }
}
