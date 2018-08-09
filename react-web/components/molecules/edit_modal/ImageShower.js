import React from 'react'
import range from 'lodash/range'

// 2x2 image container
export class ImageContainer extends React.Component {
  isSelected(src) {
    return src === this.props.selectedSrc
  }

  render() {
    const props = this.props
    const srcs = props.srcs

    const images = range(srcs.length).map(i => (
      <Image
        key={i}
        className="mb-2"
        src={srcs[i]}
        onClick={props.onClick}
        selected={this.isSelected(srcs[i])}
      />
    ))
    return (
      <div className={`row py-3 ${props.className}`}>
        <Image
          className="mb-2"
          src={`/static/img/transparent.png`}
          onClick={props.onClick}
          selected={this.isSelected(`/static/img/transparent.png`)}
        />
        {images}

        <style jsx>{`
          .row {
            height: 340px;
            overflow-y: scroll;
          }
        `}</style>
      </div>
    )
  }
}

export const Image = props => {
  const addSelected = () => (props.selected ? 'selected' : '')

  return (
    <div className={`col-6 text-center ${props.className}`}>
      <img
        className={`${addSelected()}`}
        src={props.src}
        alt="img"
        onClick={e => props.onClick(props.src)}
      />

      <style jsx>{`
        img {
          width: 100%;
          max-width: 600px;
          height: 180px;
          object-fit: contain;
          background-color: whitesmoke;
          cursor: pointer;
        }

        img.selected {
          outline: solid 10px black;
        }

        img:hover:not(.selected) {
          outline: solid 5px gray;
        }
      `}</style>
    </div>
  )
}
