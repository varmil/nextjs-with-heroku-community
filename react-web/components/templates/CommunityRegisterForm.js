import React from 'react'
import TallTextInput from 'components/atoms/TallTextInput'

const mbStyle = { marginBottom: 20 }

function Card(props) {
  return (
    <div
      className={`card mx-auto rounded-0 ${props.className}`}
      style={{ width: '18rem' }}
    >
      <img
        className="card-img-top"
        src="https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </p>
      </div>

      <style jsx>{`
        .card-img-top {
          border-radius: 0;
        }
      `}</style>
    </div>
  )
}

export default class CommunityRegisterForm extends React.Component {
  render() {
    return (
      <div>
        <div className="box" style={{}}>
          <div className="my-3 px-3">コミュニティ情報</div>
          <hr className="my-1 mb-3" />
          <div className="form form-group my-3 px-5">
            <label>コミュニティ名</label>
            <TallTextInput style={mbStyle} />

            <div className="my-5">コミュニティ公開範囲</div>
            <Card className="mb-5" title={'Close'} />
            <Card className="mb-5" title={'Limited'} />
            <Card className="mb-5" title={'Open'} />
          </div>
        </div>

        <style jsx>{`
          .box {
            border: 3px #2b6db2 solid;
          }
        `}</style>
      </div>
    )
  }
}
