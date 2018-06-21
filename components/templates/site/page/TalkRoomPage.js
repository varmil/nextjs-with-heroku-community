import React from 'react'
import range from 'lodash/range'
import Link from 'next/link'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import Header from 'components/templates/site/container/Header'
import PostSortButtons from 'components/molecules/PostSortButtons'
import BoxContent from 'components/organisms/site/BoxContent'
import { setTalkRoomCategories } from 'actions/site'

const initialState = {}

export default class TalkRoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  createBoxContents() {
    return (
      <div className="wrap my-4">
        <div className="c">
          <BoxContent />
        </div>
        <div className="c">
          <BoxContent />
        </div>
        <div className="c">
          <BoxContent />
        </div>

        <style jsx>{`
          .wrap {
            width: 90%;
            margin: 0 auto;
          }

          .c {
            margin: 20px 0;
          }
        `}</style>
      </div>
    )
  }

  /**
   * Edit Handler START
   */
  onSaveCategory(state) {
    console.log(state)
    this.props.dispatch(setTalkRoomCategories({ ...state }))
  }

  // // Main Banner
  // onSaveMainBanner(state, index) {
  //   this.props.dispatch(setMainBanner({ ...state, index }))
  // }
  //
  // // Sub Banner
  // onSaveSubBanner(state, index) {
  //   this.props.dispatch(setSubBanner({ ...state, index }))
  // }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    const talkRoom = props.talkroom

    return (
      <React.Fragment>
        <Header edit={props.edit} />

        <main>
          <section className="">
            <BoxHeader
              icon={false}
              defaultText={props.top.boxes[0].header.defaultText}
              contentState={props.top.boxes[0].header.contentState}
              src={props.top.boxes[0].header.src}
              backgroundColor={props.top.boxes[0].header.backgroundColor}
            />
          </section>

          <section className="desc container py-3 my-1 font-weight-bold">
            {talkRoom.desc.text}
          </section>

          <section className="inputForm container py-3 my-1">
            <Link href="">
              <div className="inner p-4">
                <span>{talkRoom.inputForm.text}</span>
                <i className="fas fa-image" />
              </div>
            </Link>
          </section>

          <section className="cat container pt-3 mt-1">
            <props.categorySelect
              item={talkRoom.categories.item}
              onSave={this.onSaveCategory.bind(this)}
            />
          </section>

          <section className="contents container py-3 my-1">
            <PostSortButtons />

            {this.createBoxContents()}
          </section>
        </main>

        <style jsx>{`
          .desc {
            border-bottom: solid gray 1px;
          }

          .inputForm .inner {
            position: relative;
            color: gray;
            border: 2px solid gray;
            border-radius: 25px;
          }

          span {
            display: inline-block;
            width: 80%;
            font-size: 12px;
          }

          .inputForm .inner i {
            position: absolute;
            right: 20px;
            top: 22px;
            font-size: 30px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
