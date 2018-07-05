import React from 'react'
import Dropzone from 'react-dropzone'
import Avatar from 'components/atoms/Avatar'

const ImgPreview = props => {
  // crop and resize images
  // http://stackoverflow.com/questions/11552380/how-to-automatically-crop-and-center-an-image
  const imgStyle = {
    objectFit: 'cover',
    objectPosition: 'center'
  }

  if (!props.files.length) {
    return (
      <Avatar
        src={'https://www.w3schools.com/w3images/avatar2.png'}
        className=""
        size={props.size}
        style={imgStyle}
      />
    )
  }

  const file = props.files[0]
  return (
    <Avatar
      src={file.preview}
      className=""
      size={props.size}
      style={imgStyle}
    />
  )
}

export default class extends React.Component {
  render() {
    const props = this.props
    const dropzoneStyle = {
      position: 'relative',
      display: 'block',
      margin: '0 auto',
      textAlign: 'center',
      width: props.size,
      // this is important !
      overflow: 'hidden'
    }

    return (
      <React.Fragment>
        <Dropzone accept="image/*" onDrop={props.onDrop} style={dropzoneStyle}>
          <ImgPreview files={props.files} size={props.size} />
          <i className="fas fa-camera" />
          {props.children}
        </Dropzone>

        <style jsx>{`
          i {
            font-size: 20px;
            position: absolute;
            top: 20px;
            left: 10px;
            color: gray;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
