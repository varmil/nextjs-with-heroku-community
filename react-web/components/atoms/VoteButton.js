import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'

const Linked = props => {
  return props.route ? (
    <Link route={props.route}>{props.children}</Link>
  ) : (
    props.children
  )
}

const VoteButton = props => (
  <React.Fragment>
    <Linked route={props.route}>
      <button
        type="button"
        className="btn"
        style={{ ...props.style }}
        onClick={props.onClick}
      >
        {props.isVoted ? '投票済み' : '投票する'}
      </button>
    </Linked>

    <style jsx>{`
      button {
        font-size: 12px;
        font-weight: bold;
        width: 120px;
        border-radius: 30px;
        color: ${props.isVoted ? props.voteButtonColor : 'white'};
        background-color: ${props.isVoted ? 'white' : props.voteButtonColor};
        border: ${props.isVoted ? '1px solid' : 'none'};
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
