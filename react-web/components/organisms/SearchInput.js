import React from 'react'
import { connect } from 'react-redux'
// import { createAction } from 'redux-actions'
// import { SiteState } from 'constants/ActionTypes'
// import OverlayEdit from 'components/organisms/OverlayEdit'
// import objectPath from 'object-path'
import { Link } from '/routes'
import IconButton from '@material-ui/core/IconButton'

class SearchInput extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { route, word } = this.props

    return (
      <React.Fragment>
        <section className="header">
          <div className="row pl-3">
            <div className="col-1">
              <Link route={route}>
                <IconButton style={{ position: 'absolute', top: -7, left: 0 }}>
                  <i className="fas fa-chevron-left" />
                </IconButton>
              </Link>
            </div>
            <div className="search col-1 pl-4">
              <i className="fas fa-search" />
            </div>
            <div className="word col-8 px-0 pl-2">{word}</div>
          </div>
        </section>

        <style jsx>{`
          .header {
            padding: 20px 0px;
            background-color: white;
            font-size: 22px;
            overflow: hidden;
            width: 100%;
          }

          i {
            color: #4b4b4b;
          }

          .search {
            padding-right: 22px;
          }

          .word {
            color: #201715;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export default connect(state => ({
  // site: state.site
}))(SearchInput)
