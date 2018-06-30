import React from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import dynamic from 'next/dynamic'
const Editor = dynamic(import('components/atoms/BaseEditor'))

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
                'Dancing Script'
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
