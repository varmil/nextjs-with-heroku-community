import React from 'react'
import Link from 'next/link'

export default class CategorySelect extends React.Component {
  constructor(props) {
    super(props)
    // work around for SSR
    // https://github.com/zeit/next.js/issues/1722
    this.state = { show: false }
  }

  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createContents() {
    return (
      <div className="horizontal_scroll_wrap">
        <ul className="scroll_lst">
          <li className="scroll_item">
            <Link href="">
              <button type="button" className="btn btn-secondary">
                プロダクト
              </button>
            </Link>
          </li>
          <li className="scroll_item">
            <Link href="">
              <button type="button" className="btn btn-secondary">
                プロダクト
              </button>
            </Link>
          </li>
          <li className="scroll_item">
            <Link href="">
              <button type="button" className="btn btn-secondary">
                プロダクト
              </button>
            </Link>
          </li>
          <li className="scroll_item">
            <Link href="">
              <button type="button" className="btn btn-secondary">
                プロダクト
              </button>
            </Link>
          </li>
          <li className="scroll_item">
            <Link href="">
              <button type="button" className="btn btn-secondary">
                プロダクト
              </button>
            </Link>
          </li>
        </ul>

        <style jsx>{`
          .horizontal_scroll_wrap {
            overflow-y: hidden;
            margin: 0;
          }
          .scroll_lst {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 0;
          }
          .scroll_item {
            margin-right: 10px;
            display: inline-block;
          }
          .scroll_item:first-child {
            margin-left: 10px;
          }

          button {
            width: 80px;
            font-size: 11px;
          }
        `}</style>
      </div>
    )
  }

  render() {
    return <React.Fragment>{this.createContents()}</React.Fragment>
  }
}
