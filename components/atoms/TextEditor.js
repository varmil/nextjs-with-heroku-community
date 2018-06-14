import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange(editorState) {
    this.setState({ ...this.state, editorState })

    let json
    try {
      json = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    } catch (e) {
      json = EditorState.createEmpty()
    }

    this.props.onChangeText(json)
  }
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Editor
          {...props}
          editorStyle={{ border: '1px solid #f1f1f1', minHeight: 90 }}
          toolbar={{
            options: [
              'inline',
              'fontSize',
              'colorPicker',
              'list',
              'textAlign',
              'link'
            ],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            },
            textAlign: {
              options: ['left', 'center', 'right']
            }
          }}
          editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange.bind(this)}
        />
      </React.Fragment>
    )
  }
}
