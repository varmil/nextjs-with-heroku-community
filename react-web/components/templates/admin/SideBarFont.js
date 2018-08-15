import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import IconButton from '@material-ui/core/IconButton'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'

const CSS_NAMES = [
  'mplus1p',
  'roundedmplus1c',
  'hannari',
  'kokoro',
  'sawarabimincho',
  'sawarabigothic',
  'notosansjapanese'
]

class SideBarFont extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  // isSelectedDevice(type) {
  //   return type === this.props.preview.device
  // }
  //
  // onClickDevice(type) {
  //   this.props.dispatch(setDevice({ device: type }))
  // }
  //
  // createPageHierarchy() {
  //   return this.props.boxes.map((box, i) => (
  //     <React.Fragment key={i}>
  //       <PageItem
  //         level={2}
  //         slug={`${URL.BOX_BASE_SLUG}/${box.slug}`}
  //         text={box.header.text}
  //       />
  //     </React.Fragment>
  //   ))
  // }

  render() {
    const props = this.props

    if (!props.isOpen) return null

    return (
      <React.Fragment>
        <Head>
          <title>フォント変更: commune</title>

          {CSS_NAMES.map(n => (
            <link
              key={n}
              href={`https://fonts.googleapis.com/earlyaccess/${n}.css`}
              rel="stylesheet"
            />
          ))}
        </Head>

        <div className="webfont secondContents  showSlide">
          <div className="btnSidebarSecondClose">
            <IconButton
              style={{ position: 'absolute', top: 5, right: 5 }}
              onClick={props.onToggle}
            >
              <i className="fas fa-chevron-left text-white" />
            </IconButton>
          </div>

          <ul className="fonts mt-3">
            <li className="webfont-list">デフォルト</li>

            <li className="webfont-list webfont-list--caption">Noto系</li>
            <li className="webfont-list wf-notosansjapanese">
              Noto Sans Japanese
            </li>

            <li className="webfont-list webfont-list--caption">ゴシック系</li>
            <li className="webfont-list wf-sawarabigothic">さわらびゴシック</li>

            <li className="webfont-list webfont-list--caption">明朝系</li>
            <li className="webfont-list wf-hannari">はんなり明朝</li>
            <li className="webfont-list wf-kokoro">こころ明朝</li>
            <li className="webfont-list wf-sawarabimincho">さわらび明朝</li>

            <li className="webfont-list webfont-list--caption">その他</li>
            <li className="webfont-list wf-mplus1p">M+ 1p</li>
            <li className="webfont-list wf-roundedmplus1c">Rounded M+ 1c</li>
          </ul>
        </div>

        {/* FONT */}
        <style jsx>{`
          .wf-mplus1p {
            font-family: 'Mplus 1p';
          }
          .wf-roundedmplus1c {
            font-family: 'Rounded Mplus 1c';
          }

          .wf-hannari {
            font-family: 'Hannari';
          }
          .wf-kokoro {
            font-family: 'Kokoro';
          }
          .wf-sawarabimincho {
            font-family: 'Sawarabi Mincho';
          }

          .wf-sawarabigothic {
            font-family: 'Sawarabi Gothic';
          }

          .wf-notosansjapanese {
            font-family: 'Noto Sans Japanese';
          }
          .noto {
            font-family: 'Noto Sans Japanese';
          }
        `}</style>

        {/* UI */}
        <style jsx>{`
          ul,
          li {
            list-style-type: none;
            color: white;
          }

          .secondContents > ul {
            padding-left: 0;
          }

          .secondContents {
            position: fixed;
            z-index: 500;
            width: 180px;
            height: 100%;
            padding: 35px 10px 0;
            background-color: #09282f;
            transition: all 0.3s ease-in;
            left: 180px;
            overflow: auto;
            top: 114px;
          }

          .webfont-list:first-of-type {
            padding-left: 0;
          }

          .secondContents > ul li {
            margin-bottom: 10px;
            border-bottom: none;
            cursor: pointer;
          }

          .secondContents > ul .webfont-list--caption:hover {
            box-shadow: none;
          }

          .secondContents > ul li:hover,
          .secondContents > ul li.current {
            box-shadow: 0 0 0 2px #1cbbd0;
          }

          .webfont-list {
            height: 20px;
            width: 160px;
          }

          .secondContents > ul .webfont-list--caption {
            border-bottom: 1px dashed rgba(255, 255, 255, 0.6);
          }

          .webfont-list--caption {
            height: auto;
            font-size: 11px;
            color: #fff;
            margin-top: 2.5em;
            padding-bottom: 0.7em;
            font-weight: 700;
            padding-left: 0;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({}))(SideBarFont)
