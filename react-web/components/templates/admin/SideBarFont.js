import React from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Head from 'next/head'
import IconButton from '@material-ui/core/IconButton'
import { createAction } from 'redux-actions'
import { SiteState, SiteCommon } from 'constants/ActionTypes'
// import objectPath from 'object-path'
// import { PATH_MAP } from 'reducers/site'

const FONTS = [
  { isWebfont: true, cssName: 'mplus1p', familyName: 'Mplus 1p' },
  {
    isWebfont: true,
    cssName: 'roundedmplus1c',
    familyName: 'Rounded Mplus 1c'
  },
  { isWebfont: true, cssName: 'hannari', familyName: 'Hannari' },
  { isWebfont: true, cssName: 'kokoro', familyName: 'Kokoro' },
  { isWebfont: true, cssName: 'sawarabimincho', familyName: 'Sawarabi Mincho' },
  { isWebfont: true, cssName: 'sawarabigothic', familyName: 'Sawarabi Gothic' },
  {
    isWebfont: true,
    cssName: 'notosansjapanese',
    familyName: 'Noto Sans Japanese'
  }
]

const FontItemLi = props => (
  <li
    className={`webfont-list wf ${
      (props.currentFont && props.currentFont.cssName) ===
      (props.font && props.font.cssName)
        ? 'current'
        : ''
    }`}
    onClick={() => props.onClick(props.font)}
  >
    {props.children}

    <style jsx>{`
      .wf {
        font-family: ${props.font ? `'${props.font.familyName}'` : 'initial'};

        margin-bottom: 10px;
        border-bottom: none;
        cursor: pointer;

        height: 20px;
        width: 160px;
        padding-left: 10px;
      }

      .wf:hover,
      .wf.current {
        box-shadow: 0 0 0 2px #1cbbd0;
      }
    `}</style>
  </li>
)

class SideBarFont extends React.Component {
  // font === NULLはデフォルトフォントを意味する
  onClick = font => {
    console.log('font selected', font)
    // ここで dispatch してしまってSAVE
    const action = createAction(SiteCommon.SET_FONT_FAMILY)(font)
    this.props.dispatch(createAction(SiteState.SAVE_REQUEST)({ action }))
  }

  render() {
    const props = this.props
    const { fontFamily } = this.props

    if (!props.isOpen) return null

    return (
      <React.Fragment>
        <Head>
          <title>フォント変更: commune</title>

          {map(FONTS, 'cssName').map(n => (
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
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={null}
            >
              デフォルト
            </FontItemLi>

            <li className="webfont-list webfont-list--caption">Noto系</li>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[6]}
            >
              Noto Sans JP
            </FontItemLi>

            <li className="webfont-list webfont-list--caption">ゴシック系</li>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[5]}
            >
              さわらびゴシック
            </FontItemLi>

            <li className="webfont-list webfont-list--caption">明朝系</li>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[2]}
            >
              はんなり明朝
            </FontItemLi>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[3]}
            >
              こころ明朝
            </FontItemLi>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[4]}
            >
              さわらび明朝
            </FontItemLi>

            <li className="webfont-list webfont-list--caption">その他</li>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[0]}
            >
              M+ 1p
            </FontItemLi>
            <FontItemLi
              currentFont={fontFamily}
              onClick={this.onClick}
              font={FONTS[1]}
            >
              Rounded M+ 1c
            </FontItemLi>
          </ul>
        </div>

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

          .secondContents > ul li {
            margin-bottom: 10px;
            border-bottom: none;
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

          .secondContents > ul .webfont-list--caption:hover {
            box-shadow: none;
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

export default connect(state => ({
  fontFamily: state.site.common.fontFamily
}))(SideBarFont)
