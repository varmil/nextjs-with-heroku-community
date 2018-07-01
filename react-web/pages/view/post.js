import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent, { VoteCounter } from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'
import BoxType from 'constants/BoxType'

// コメントする際にBottomに飛ばしたい
const BOTTOM_Y = 9999

class VoteOptions extends React.Component {
  state = {
    selectedIndex: this.props.voteOptions.selectedIndex
  }

  render() {
    const props = this.props
    const { voteOptions } = props

    return (
      <div className="wrap mt-3 pb-5">
        <section className="px-5">
          <VoteCounter
            className="mb-3"
            num={821}
            deadline={'2018年6月14日23:59'}
            showDeadline={true}
          />

          {voteOptions.item.map((o, i) => {
            return (
              <div
                key={i}
                className={`option my-1 ${
                  i === this.state.selectedIndex ? 'active' : ''
                }`}
                onClick={() => this.setState({ selectedIndex: i })}
              >
                {o.text}
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
    dispatch(createAction(AppPost.FETCH_REQUEST)(ctx.query))
    return { focus: !!ctx.query.focus, boxType: +ctx.query.boxType }
  }

  componentDidMount() {
    if (this.props.focus) {
      window.scrollTo(0, BOTTOM_Y)
    }
  }

  render() {
    const props = this.props
    const { data } = props.post
    const isVoice = props.boxType === BoxType.VOICE
    return (
      <React.Fragment>
        <BoxContent
          {...data}
          expandBody={true}
          showDetail={true}
          focus={props.focus}
          // vote
          topPhoto={isVoice}
        >
          {isVoice && <VoteOptions voteOptions={data.voteOptions} />}
        </BoxContent>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(Post)
