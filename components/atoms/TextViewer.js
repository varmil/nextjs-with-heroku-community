import React from 'react'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

export default class TextViewer extends React.Component {
  constructor(props) {
    super(props)
    // work around for SSR
    // https://github.com/zeit/next.js/issues/1722
    this.state = { editor: false }
  }

  createEditorState() {
    let editorState
    try {
      const content = this.props.value
        ? convertFromRaw(JSON.parse(this.props.value))
        : ContentState.createFromText(this.props.defaultText || '')
      editorState = EditorState.createWithContent(content)
    } catch (e) {
      editorState = EditorState.createEmpty()
    }

    return editorState
  }

  componentDidMount() {
    this.setState({ ...this.state, editor: true })
  }

  render() {
    if (!this.state.editor) return null

    return (
      <Editor
        toolbarHidden
        readOnly={true}
        editorState={this.createEditorState()}
      />
    )
  }
}
