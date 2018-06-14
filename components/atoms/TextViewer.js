import React from 'react'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

export default class TextViewer extends React.Component {
  createEditorState() {
    let editorState
    try {
      const content = this.props.value
        ? convertFromRaw(JSON.parse(this.props.value))
        : ContentState.createFromText(this.props.defaultText)
      editorState = EditorState.createWithContent(content)
    } catch (e) {
      editorState = EditorState.createEmpty()
    }

    return editorState
  }

  render() {
    return (
      <Editor
        toolbarHidden
        readOnly={true}
        editorState={this.createEditorState()}
      />
    )
  }
}
