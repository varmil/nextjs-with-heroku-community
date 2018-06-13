// Modal内で使う画像ビューワ
import range from 'lodash/range'

/**
 * Components
 */

// 2x2 image container
export const ImageContainer = props => {
  return (
    <div className={`row ${props.className}`}>
      {props.images}

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
    <div className={`col-md-6 col-lg-6 text-center ${props.className}`}>
      <img src={props.src} alt="image" />

      <style jsx>{`
        img {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </div>
  )
}

/**
 * Util functions
 */

export function createExistingImages(srcs) {
  const images = range(srcs.length).map(i => (
    <Image key={`LIModalImg${i}`} className="mb-2" src={srcs[i]} />
  ))
  return <ImageContainer className="mb-4" images={images} />
}
