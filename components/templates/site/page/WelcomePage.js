import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { setWelcome } from 'actions/site'

const initialState = {}

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  /**
   * Edit Handler START
   */
  onSave(state) {
    this.props.dispatch(setWelcome({ ...state }))
  }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <props.welcomeElement
          contentState={props.welcome.contentState}
          src={props.welcome.src}
          backgroundColor={props.welcome.backgroundColor}
          onSave={this.onSave.bind(this)}
        />
      </React.Fragment>
    )
  }
}
