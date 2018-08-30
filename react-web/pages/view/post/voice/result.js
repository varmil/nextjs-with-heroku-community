import React from 'react'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent, { VoteCounter } from 'components/organisms/site/BoxContent'
import CommentZone from 'components/organisms/site/box/CommentZone'
import { AppPost } from 'constants/ActionTypes'
// import BoxType from '/../shared/constants/BoxType'

const OPTION_HEIGHT = 56
const INITIAL_COMMENT_NUM = 1

class PostVoiceOption extends React.Component {
  // boxType, postId などは文字列なので注意
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const postId = +ctx.query.postId
    dispatch(createAction(AppPost.FETCH_REQUEST)({ postId }))
    return { postId }
  }

  createPercentageDiv(optionIndex) {
    const { percentages } = this.props.post.data.Voice
    const e = find(percentages, { choiceIndex: optionIndex })
    const percentage = e ? e.percentage : 0
    return (
      <div className={'percent'}>
        <span>{percentage}%</span>
        <style jsx>{`
          .percent {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: left;
            line-height: ${OPTION_HEIGHT}px;
          }

          span {
            position: relative;
            left: 6%;
            z-index: 3;
          }

          .percent:after {
            content: '';
            position: absolute;
            background: ${e && e.isMostPopular ? '#509FEF' : '#c1c0c0'};
            top: 0;
            bottom: 0;
            left: 0;
            width: ${percentage}%;
            z-index: 2;
          }
        `}</style>
      </div>
    )
  }

  // 引数のindex（==choiceIndex）に応じて、comments
  getCommentsForOption(index) {
    const comments = this.props.post.comments
    return comments[index]
  }

  render() {
    const post = this.props.post
    const { data } = post
    const { count, options } = data.Voice

    return (
      <React.Fragment>
        <BoxContent
          {...data}
          comments={false}
          showDetail={true}
          topPhoto={true}
        >
          <section className="px-5">
            <VoteCounter className="mb-3" count={count} />
          </section>

          <section className="px-5">
            {options.map((text, i) => {
              return (
                <React.Fragment key={i}>
                  <div className={`mt-1 mb-3`}>
                    <section className={`option mx-auto`}>
                      {this.createPercentageDiv(i)}
                      <div className={'text'}>{text}</div>
                    </section>
                    <section>
                      <CommentZone
                        key={i}
                        postId={data.id}
                        comments={this.getCommentsForOption(i)}
                        initialNum={INITIAL_COMMENT_NUM}
                        // voice用option
                        index={i}
                      />
                    </section>
                  </div>
                </React.Fragment>
              )
            })}
          </section>
        </BoxContent>

        <style jsx>{`
          .option {
            position: relative;
            font-size: 14px;
            text-align: center;
            height: ${OPTION_HEIGHT}px;
          }

          .option.active {
            color: white;
            background-color: black;
            transition: all 0.25s ease;
          }

          .option .text {
            position: relative;
            z-index: 5;
            font-weight: bold;
            line-height: ${OPTION_HEIGHT}px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(PostVoiceOption)
