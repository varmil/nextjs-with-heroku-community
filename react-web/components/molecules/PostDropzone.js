import React from 'react'
import DropzoneIcon from 'components/atoms/Dropzone'
import Rule from 'constants/Rule'

class PostDropzone extends React.Component {
  state = {
    files: this.props.files
  }

  onDrop(files) {
    let newFiles = this.state.files.concat(files)
    if (newFiles.length > Rule.MAX_UPLOAD_FILES) {
      newFiles = newFiles.slice(0, Rule.MAX_UPLOAD_FILES)
    }
    this.setState({ ...this.state, files: newFiles })
    this.props.onChange(newFiles)
  }

  onDelete(e, tappedFile) {
    e.preventDefault()
    e.stopPropagation()
    // Remove tappedItem from state.files
    const filtered = this.state.files.filter(
      f => f.preview !== tappedFile.preview
    )
    this.setState({ ...this.state, files: filtered })
    this.props.onChange(filtered)
  }

  render() {
    const state = this.state
    return (
      <React.Fragment>
        <DropzoneIcon
          size={this.props.size}
          files={state.files}
          onDrop={this.onDrop.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default PostDropzone
