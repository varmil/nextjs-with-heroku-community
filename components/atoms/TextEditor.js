import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props)

    let editorState
    try {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.value))
      )
    } catch (e) {
      editorState = EditorState.createEmpty()
    }

    this.state = { editorState }
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
              'fontFamily',
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
            },
            fontFamily: {
              options: [
                'Arial',
                'Georgia',
                'Impact',
                'Tahoma',
                'Times New Roman',
                'Verdana',
                'Monotype Corsiva'
              ]
            }
          }}
          editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange.bind(this)}
        />
      </React.Fragment>
    )
  }
}
