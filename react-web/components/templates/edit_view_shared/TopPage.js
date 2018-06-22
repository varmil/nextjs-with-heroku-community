import React from 'react'
import range from 'lodash/range'
import { setMainBanner, setBoxHeader, setSubBanner } from 'actions/site'
import BoxContent from 'components/organisms/site/BoxContent'
import Header from 'components/templates/container/Header'

const initialState = {}

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // NOTE: dynamic import should be done before render(), not render() or constructor()
  // dynamicImport() {
  //   if (this.props.edit) {
  //     MainBanner = dynamic(import('components/organisms/site/edit/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/edit/BoxHeader'))
  //     SubBanner = dynamic(import('components/organisms/site/edit/SubBanner'))
  //   } else {
  //     MainBanner = dynamic(import('components/organisms/site/base/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/base/BoxHeader'))
  //     SubBanner = dynamic(import('components/organisms/site/base/SubBanner'))
  //   }
  // }

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
          <this.props.subBanner
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

  // onSaveFooter(state) {
  //   this.props.dispatch(setFooter(state))
  // }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    const mainBanner = props.top.mainBanner

    return (
      <React.Fragment>
        <Header edit={props.edit} />

        <main>
          {range(mainBanner.item.length).map(i => (
            <props.mainBanner
              key={i}
              className="mt-2 mb-3"
              contentState={mainBanner.item[i].contentState}
              src={mainBanner.item[i].src}
              backgroundColor={mainBanner.item[i].backgroundColor}
              href={mainBanner.item[i].href}
              onSave={state => this.onSaveMainBanner(state, i)}
            />
          ))}

          {range(props.top.boxes.length).map(i => (
            <React.Fragment key={i}>
              <props.boxHeader
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

          <div className="subBanner mt-3 mb-5">{this.createSubBanners()}</div>
        </main>

        {/* <Footer
          {...props.common.footer}
          onSave={this.onSaveFooter.bind(this)}
        /> */}
      </React.Fragment>
    )
  }
}
