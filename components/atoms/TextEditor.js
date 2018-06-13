import React from 'react'
import { Editor } from 'react-draft-wysiwyg'

const Index = props => (
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
    />
  </React.Fragment>
)
export default Index
