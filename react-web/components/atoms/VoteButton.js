import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'

const VoteButton = props => (
  <React.Fragment>
    <Link route={props.route}>
      <button type="button" className="btn">
        投票する
      </button>
    </Link>

    <style jsx>{`
      button {
        font-size: 12px;
        width: 120px;
        border-radius: 30px;
        color: white;
        background-color: ${props.voteButtonColor};
      }
    `}</style>
  </React.Fragment>
)

export default connect(state => ({
  voteButtonColor: objectPath.get(
    state.site,
    `${PATH_MAP.COLOR}.backgroundColor`
  )
}))(VoteButton)
