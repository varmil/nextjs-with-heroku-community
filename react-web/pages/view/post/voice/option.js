import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import autosize from 'autosize'
import isUndefined from 'lodash/isUndefined'
import VoteButton from 'components/atoms/VoteButton'
import BoxContent, { VoteCounter } from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'

class VoteOptions extends React.Component {
  constructor(props) {
    super(props)
    const { choiceIndex, count } = this.props.Voice
    this.state = {
      // 自分自身が投票した結果があればそれをぶちこむ。
      choiceIndex: !isUndefined(choiceIndex) ? choiceIndex : null,
      // 投票後にローカルでインクリメントするためにstateで保持
      count: !isUndefined(count) ? count : null
    }
  }

  onVote(index) {
    const { count } = this.state
    const { dispatch, postId } = this.props

    // 先行してローカルステートを更新
    this.setState({ ...this.state, choiceIndex: index })

    const successCb = async res => {
      // レスポンスを待って状態更新
      this.setState({
        ...this.state,
        count: res.data.isFirstVote ? count + 1 : count
      })
      // store内の当該Postの投票数をカウントアップ
      if (res.data.isFirstVote) {
        dispatch(createAction(AppPost.INCREMENT_VOTE_SUM)({ postId }))
      }
    }
    dispatch(
      createAction(AppPost.SAVE_VOTE_REQUEST)({
        postId,
        choiceIndex: index,
        successCb
      })
    )
  }

  render() {
    const { count } = this.state
    const props = this.props
    const { options, deadline } = props.Voice

    return (
      <div className="wrap">
        <section className="px-5">
          <VoteCounter
            className="mb-3"
            count={count}
            deadline={deadline}
            showDeadline={true}
          />

          {options.map((text, i) => {
            return (
              <div
                key={i}
                className={`option my-1 ${
                  i === this.state.choiceIndex ? 'active' : ''
                }`}
                onClick={e => this.onVote(i)}
              >
                {text}
              </div>
            )
          })}
        </section>

        <style jsx>{`
          .wrap {
            // border-bottom: 1px solid #c1c0c0;
          }

          .option {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            padding: 20px 0;
            border: 1px solid #c1c0c0;
          }

          .option:hover,
          .option.active {
            color: white;
            background-color: black;
            transition: all 0.25s ease;
          }
        `}</style>
      </div>
    )
  }
}

class PostVoiceOption extends React.Component {
  // boxType, postId などは文字列なので注意
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    dispatch(createAction(AppPost.FETCH_REQUEST)({ postId: +ctx.query.postId }))
    return {}
  }

  constructor(props) {
    super(props)
    this.commentInput = React.createRef()
    this.state = { comment: '' }
  }

  componentDidMount() {
    if (this.commentInput) autosize(this.commentInput)
  }

  render() {
    const props = this.props
    const { data } = props.post

    return (
      <React.Fragment>
        <BoxContent
          {...data}
          comments={false}
          showDetail={true}
          focus={props.focus}
          // vote
          topPhoto={true}
        >
          <VoteOptions
            Voice={data.Voice}
            postId={data.id}
            dispatch={props.dispatch}
          />

          <div className="px-5 mt-4">
            <textarea
              placeholder="コメントをくわえる"
              className="form-control mx-auto py-3"
              rows="1"
              ref={input => (this.commentInput = input)}
              value={this.state.comment}
              onChange={e =>
                this.setState({ ...this.state, comment: e.target.value })
              }
            />
          </div>

          <div className="mt-4 text-center">
            <VoteButton
              style={{
                fontSize: 14,
                padding: '10px 0px',
                width: 170
              }}
            />
          </div>
        </BoxContent>

        <style jsx>{`
          textarea {
            border-radius: 30px;
          }

          ::-webkit-input-placeholder {
            text-align: center;
          }

          :-moz-placeholder {
            /* Firefox 18- */
            text-align: center;
          }

          ::-moz-placeholder {
            /* Firefox 19+ */
            text-align: center;
          }

          :-ms-input-placeholder {
            text-align: center;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(PostVoiceOption)
