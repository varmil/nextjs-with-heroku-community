import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { SiteState } from 'constants/ActionTypes'
import objectPath from 'object-path'
import { Link } from '/routes'
import IconButton from '@material-ui/core/IconButton'
import { PreviewImage } from 'components/organisms/site/Photos'

class SearchPhoto extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { photos, word } = this.props

    return (
      <React.Fragment>
        <section className="header" />
        <div className="row">
          {photos.map((e, i) => (
            <div key={i} className="col-6 px-1">
              <PreviewImage
                route={`/view/post/${e.boxType}/${e.id}`}
                src={e.photo}
                index={e.index}
              />
            </div>
          ))}
        </div>
        <div>もっとみる</div>
        <style jsx>{`
          .header {
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export default connect(state => ({
  photos: state.app.search.photos
}))(SearchPhoto)
