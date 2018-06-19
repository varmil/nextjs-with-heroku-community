// Modal内で使う画像ビューワ
import range from 'lodash/range'

/**
 * Components
 */

// 2x2 image container
export const ImageContainer = props => {
  return (
    <div className={`row ${props.className}`}>
      {props.children}

      <style jsx>{`
        .row {
          height: 340px;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}

export const Image = props => {
  return (
    <div className={`col-6 text-center ${props.className}`}>
      <img src={props.src} alt="img" onClick={e => props.onClick(props.src)} />

      <style jsx>{`
        img {
          width: 100%;
          max-width: 600px;
          height: 180px;
          object-fit: contain;
          background-color: whitesmoke;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

/**
 * Util functions
 */

export function createExistingImages(srcs, onClick) {
  const images = range(srcs.length).map(i => (
    <Image
      key={`LIModalImg${i}`}
      className="mb-2"
      src={srcs[i]}
      onClick={onClick}
    />
  ))
  return (
    <ImageContainer className="mb-4">
      <Image
        className="mb-2"
        src={`/static/img/transparent.png`}
        onClick={onClick}
      />
      {images}
    </ImageContainer>
  )
}
