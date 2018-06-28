import React from 'react'
import Link from 'next/link'
import Classes from 'constants/Classes'

const Item = props => {
  return (
    <li className={`scroll_item ${props.className || ''}`}>
      <Link href="">
        <button type="button" className="btn btn-secondary">
          {props.text}
        </button>
      </Link>

      <style jsx>{`
        .scroll_item {
          margin-right: 10px;
          display: inline-block;
        }
        .scroll_item:first-child {
          margin-left: 10px;
        }

        button {
          width: 95px;
          font-size: 11px;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
    </li>
  )
}

export default class CategorySelect extends React.Component {
  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createContents() {
    const props = this.props
    return (
      <div
        className={`horizontal_scroll_wrap ${Classes.EDITABLE}`}
        data-modal={`CategoryListModal`}
        data-action={props.action}
        data-path={props.propsPath}
      >
        <ul className="scroll_lst">
          {/* default all */}
          <Item text={'全て'} />

          {/* skip null text */}
          {props.item.filter(e => e.text).map((e, i) => {
            return <Item key={i} text={e.text} />
          })}
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
        `}</style>
      </div>
    )
  }

  render() {
    return <React.Fragment>{this.createContents()}</React.Fragment>
  }
}
