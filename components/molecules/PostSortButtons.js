import React from 'react'
import range from 'lodash/range'

const initialState = {}

export default class PostSortButtons extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="text-center">
          <button type="button" className="btn btn-primary mx-2">
            更新順
          </button>
          <button type="button" className="btn btn-primary mx-2">
            コメント順
          </button>
        </div>

        <style jsx>{`
          button {
            width: 110px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
