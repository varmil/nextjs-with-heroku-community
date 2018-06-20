import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { setWelcome } from 'actions/site'
import dynamic from 'next/dynamic'

const initialState = {}
let Welcome

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.dynamicImport()
  }

  dynamicImport() {
    if (this.props.edit) {
      Welcome = dynamic(import('components/organisms/site/edit/Welcome'))
    } else {
      Welcome = dynamic(import('components/organisms/site/base/Welcome'))
    }
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
        <Welcome
          contentState={props.welcome.contentState}
          src={props.welcome.src}
          backgroundColor={props.welcome.backgroundColor}
          onSave={this.onSave.bind(this)}
        />
      </React.Fragment>
    )
  }
}
