import React from 'react'
import Link from 'next/link'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import Header from 'components/templates/site/container/Header'
import PostSortButtons from 'components/molecules/PostSortButtons'
import BoxContent from 'components/organisms/site/BoxContent'
import {
  setTalkRoomCategories,
  setTalkRoomDesc,
  setTalkRoomInputForm
} from 'actions/site'

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
  onSaveDesc(state) {
    if (state.text.length === 0) return
    this.props.dispatch(setTalkRoomDesc({ ...state }))
  }

  onSaveInputForm(state) {
    if (state.text.length === 0) return
    this.props.dispatch(setTalkRoomInputForm({ ...state }))
  }

  onSaveCategory(state) {
    this.props.dispatch(setTalkRoomCategories({ ...state }))
  }

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

          <section className="desc container py-3 my-1">
            <props.pageDescription
              text={talkRoom.desc.text}
              onSave={this.onSaveDesc.bind(this)}
            />
          </section>

          <section className="inputForm container py-3 my-1">
            <props.preInputForm
              href={''}
              text={talkRoom.inputForm.text}
              onSave={this.onSaveInputForm.bind(this)}
            />
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
        `}</style>
      </React.Fragment>
    )
  }
}
