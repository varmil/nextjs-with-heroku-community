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
      <img src="https://dummyimage.com/500x180/000/fff.png" alt="a" />

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

export function createExistingImages() {
  const images = range(10).map(i => (
    <Image key={`LinkedImageModalImage${i}`} className="mb-2" />
  ))
  return <ImageContainer className="mb-4" images={images} />
}
