import React from 'react'
import { SketchPicker } from 'react-color'

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { color: props.color }
  }

  onChangeComplete(color, event) {
    this.setState({ ...this.state, color: color })
    this.props.onClick(color.hex, event)
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <SketchPicker
          color={this.state.color}
          disableAlpha={true}
          onChangeComplete={this.onChangeComplete.bind(this)}
        />
      </React.Fragment>
    )
  }
}
