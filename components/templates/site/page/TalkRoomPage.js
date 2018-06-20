import React from 'react'
import range from 'lodash/range'
import Link from 'next/link'
import Select from 'react-select'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { setMainBanner, setBoxHeader, setSubBanner } from 'actions/site'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import BoxContent from 'components/organisms/site/BoxContent'
import Header from 'components/templates/site/container/Header'
import dynamic from 'next/dynamic'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    // border: 'none',
    width: 190,
    margin: '0 auto',
    fontSize: 12
  })
}

const initialState = {}
let SubBanner

export default class TalkRoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.dynamicImport()
  }

  dynamicImport() {
    if (this.props.edit) {
      SubBanner = dynamic(import('components/organisms/site/edit/SubBanner'))
    } else {
      SubBanner = dynamic(import('components/organisms/site/base/SubBanner'))
    }
  }

  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createBoxContents() {
    return (
      <div className="horizontal_scroll_wrap mt-2 mb-4">
        <ul className="scroll_lst">
          <li className="scroll_item">
            <BoxContent className="" />
          </li>
          <li className="scroll_item">
            <BoxContent className="" />
          </li>
          <li className="scroll_item">
            <BoxContent className="" />
          </li>
          <li className="scroll_item">
            <BoxContent className="" />
          </li>
        </ul>

        <style jsx>{`
          .horizontal_scroll_wrap {
            // height: 300px;
            overflow-y: hidden;
            margin: 0;
          }
          .scroll_lst {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 0;
            padding-left: 10px;
          }
          .scroll_item {
            margin-right: 10px;
            display: inline-block;
            width: 220px;
          }
          .scroll_item:first-child {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }

  createSubBanners() {
    const subBanner = this.props.top.subBanner
    return (
      <div className="">
        {range(subBanner.item.length).map(i => (
          <SubBanner
            key={i}
            className="mb-2"
            contentState={subBanner.item[i].contentState}
            src={subBanner.item[i].src}
            backgroundColor={subBanner.item[i].backgroundColor}
            href={subBanner.item[i].href}
            onSave={state => this.onSaveSubBanner(state, i)}
          />
        ))}
      </div>
    )
  }

  /**
   * Edit Handler START
   */
  onSaveBoxHeader(state, index) {
    this.props.dispatch(setBoxHeader({ ...state, index }))
  }

  // Main Banner
  onSaveMainBanner(state, index) {
    this.props.dispatch(setMainBanner({ ...state, index }))
  }

  // Sub Banner
  onSaveSubBanner(state, index) {
    this.props.dispatch(setSubBanner({ ...state, index }))
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

          <section className="desc container py-3 my-1 font-weight-bold">
            {talkRoom.desc.text}
          </section>

          <section className="inputForm container py-3 my-1">
            <Link>
              <div className="inner p-4">
                <span>{talkRoom.inputForm.text}</span>
                <i className="fas fa-image" />
              </div>
            </Link>
          </section>

          <section className="cat container py-3 my-1">
            <Link>
              <Select
                placeholder={'全カテゴリ'}
                styles={colourStyles}
                options={options}
                isSearchable={false}
              />
            </Link>
          </section>

          <section className="contents container py-3 my-1">
            <div className="text-center">
              <button type="button" className="btn btn-primary mx-2">
                更新順
              </button>
              <button type="button" className="btn btn-primary mx-2">
                コメント順
              </button>
            </div>
          </section>

          {range(props.top.boxes.length).map(i => (
            <React.Fragment key={i}>
              <BoxHeader
                key={i}
                defaultText={props.top.boxes[i].header.defaultText}
                contentState={props.top.boxes[i].header.contentState}
                src={props.top.boxes[i].header.src}
                backgroundColor={props.top.boxes[i].header.backgroundColor}
                onSave={state => this.onSaveBoxHeader(state, i)}
              />
              {this.createBoxContents()}
            </React.Fragment>
          ))}
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

          .contents button {
            width: 110px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
