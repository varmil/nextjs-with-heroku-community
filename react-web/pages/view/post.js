import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { setSuccess } from 'actions/application'
import BoxContent, { VoteCounter } from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'

// コメントする際にBottomに飛ばしたい
const BOTTOM_Y = 9999

class VoteOptions extends React.Component {
  state = {
    // 自分自身が投票した結果があればそれをぶちこむ。
    choiceIndex: this.props.Voice.choiceIndex || null,
    // 投票後にローカルでインクリメントするためにstateで保持
    count: this.props.Voice.count || 0
  }

  onVote(index) {
    const { count } = this.state
    const { dispatch, postId } = this.props
    const successCb = async res => {
      dispatch(setSuccess())
      this.setState({
        ...this.state,
        choiceIndex: index,
        count: res.data.isFirstVote ? count + 1 : count
      })
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
      <div className="wrap mt-3 pb-5">
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

        <section className="note mt-3 py-4 mx-4">
          他のアイデアやお気に入りのアイテムを<br />
          コメントでも教えてください
        </section>

        <style jsx>{`
          .wrap {
            border-bottom: 1px solid #c1c0c0;
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

          .note {
            font-size: 12px;
            color: gray;
            text-align: center;
            border: 1px solid #c1c0c0;
            border-radius: 30px;
          }
        `}</style>
      </div>
    )
  }
}

class Post extends React.Component {
  // boxTypeに応じてFETCHするBoxContentを変える
  // boxType, postId などは文字列なので注意
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const { boxType, postId } = ctx.query
    dispatch(createAction(AppPost.FETCH_REQUEST)(ctx.query))
    return { focus: !!ctx.query.focus, boxType: +boxType }
  }

  componentDidMount() {
    if (this.props.focus) {
      window.scrollTo(0, BOTTOM_Y)
    }
  }

  render() {
    const props = this.props
    const { data, comments } = props.post
    const isVoice = props.boxType === BoxType.index.voice
    return (
      <React.Fragment>
        <BoxContent
          {...data}
          comments={comments}
          expandBody={true}
          showDetail={true}
          focus={props.focus}
          // vote
          topPhoto={isVoice}
        >
          {isVoice && (
            <VoteOptions
              Voice={data.Voice}
              postId={data.id}
              dispatch={props.dispatch}
            />
          )}
        </BoxContent>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(Post)
