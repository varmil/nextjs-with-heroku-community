import React from 'react'
import { Link } from '/routes'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

import DropzoneIcon from 'components/atoms/Dropzone'
import Rule from 'constants/Rule'
import URL from 'constants/URL'

class Editpost extends React.Component {
  state = {
    // title: '',
    // body: '',
    // files: []
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onDrop(files) {
    let newFiles = this.state.files.concat(files)
    if (newFiles.length > Rule.MAX_UPLOAD_FILES) {
      newFiles = newFiles.slice(0, Rule.MAX_UPLOAD_FILES)
    }
    this.setState({ ...this.state, files: newFiles })
  }

  onDelete(e, tappedFile) {
    e.preventDefault()
    e.stopPropagation()
    // Remove tappedItem from state.files
    const filtered = this.state.files.filter(
      f => f.preview !== tappedFile.preview
    )
    this.setState({ ...this.state, files: filtered })
  }

  render() {
    const state = this.state
    const props = this.props
    const { classes } = props

    return (
      <React.Fragment>
        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="タイトル"
            value={this.state.title}
            onChange={this.handleChange('title')}
            fullWidth
          />
        </section>

        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="本文"
            value={this.state.body}
            onChange={this.handleChange('body')}
            fullWidth
            multiline
          />
        </section>

        <section>
          <DropzoneIcon
            files={state.files}
            onDrop={this.onDrop.bind(this)}
            onDelete={this.onDelete.bind(this)}
          />
        </section>
      </React.Fragment>
    )
  }
}

const Styled = withStyles(inputStyles)(Editpost)
export default connect(state => ({
  // post: state.site.post
}))(Styled)
